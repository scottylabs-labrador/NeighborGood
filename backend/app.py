"""
PunchCard backend — FastAPI entry point.
Run with: uvicorn app:app --reload --port 8001
"""

import os
import traceback

import stripe
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from pydantic import BaseModel

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")

app = FastAPI(title="PunchCard API")

# ---------------------------------------------------------------------------
# In-memory punchcard store (test data — resets on server restart)
# Replace this with a real database later. Each dict is one card.
# ---------------------------------------------------------------------------

_cards: list[dict] = [
    {"id": 1, "businessName": "Biz name 1", "totalStamps": 9, "usedStamps": 6},
    {"id": 2, "businessName": "Biz name 2", "totalStamps": 9, "usedStamps": 2},
    {"id": 3, "businessName": "Biz name 3", "totalStamps": 9, "usedStamps": 1},
    {"id": 4, "businessName": "Biz name 4", "totalStamps": 9, "usedStamps": 3},
    {"id": 5, "businessName": "Biz name 5", "totalStamps": 9, "usedStamps": 0},
]

# This ID identifies our app to Google. It must match what's registered in
# Google Cloud Console under "OAuth 2.0 Client IDs".
GOOGLE_CLIENT_ID = (
    "212855412758-c7guc92ug9eloic9a3ib9eknhrapgni1.apps.googleusercontent.com"
)

# ---------------------------------------------------------------------------
# Middleware
# ---------------------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class GoogleCredential(BaseModel):
    credential: str


class CreateIntentRequest(BaseModel):
    card_id: int     # which punchcard to stamp after payment
    amount: int      # amount in cents (e.g. 500 = $5.00)
    currency: str = "usd"


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/cards")
def get_cards():
    """Return all punchcards."""
    return {"ok": True, "cards": _cards}


@app.get("/health")
def health():
    return {"ok": True}


# ---------------------------------------------------------------------------
# Payment — simple test endpoint (no Stripe, instant stamp)
# ---------------------------------------------------------------------------

class PaymentRequest(BaseModel):
    card_id: int


@app.post("/payment/authenticate")
def authenticate_payment(payload: PaymentRequest):
    """Stamp a card immediately — used by the test UI before Stripe is wired up."""
    for card in _cards:
        if card["id"] == payload.card_id:
            if card["usedStamps"] >= card["totalStamps"]:
                raise HTTPException(status_code=400, detail="Card is already full")
            card["usedStamps"] += 1
            return {"ok": True, "card": card}
    raise HTTPException(status_code=404, detail="Card not found")


# ---------------------------------------------------------------------------
# Payment — Step 1: create a PaymentIntent
# ---------------------------------------------------------------------------

@app.post("/payment/create-intent")
def create_payment_intent(payload: CreateIntentRequest):
    """
    Creates a Stripe PaymentIntent and returns the client_secret to the
    frontend. The frontend uses the client_secret to render Stripe's payment
    UI and collect card details — we never touch raw card numbers here.

    card_id is stored as metadata so the webhook knows which punchcard to
    stamp when payment succeeds.
    """
    # Validate the card exists before creating a charge
    card = next((c for c in _cards if c["id"] == payload.card_id), None)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    if card["usedStamps"] >= card["totalStamps"]:
        raise HTTPException(status_code=400, detail="Card is already full")

    try:
        intent = stripe.PaymentIntent.create(
            amount=payload.amount,
            currency=payload.currency,
            # Store card_id in metadata so the webhook can stamp the right card
            metadata={"card_id": str(payload.card_id)},
            # automatic_payment_methods lets Stripe handle all payment method
            # types enabled in your Stripe Dashboard without extra config here
            automatic_payment_methods={"enabled": True},
        )
        return {"ok": True, "clientSecret": intent.client_secret}
    except stripe.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e.user_message))


# ---------------------------------------------------------------------------
# Payment — Step 2: webhook (Stripe calls this after payment completes)
# ---------------------------------------------------------------------------

@app.post("/payment/webhook")
async def stripe_webhook(request: Request):
    """
    Stripe sends a signed POST here when a payment event occurs.

    Flow:
      1. Stripe confirms the customer's payment.
      2. Stripe POSTs a `payment_intent.succeeded` event to this endpoint.
      3. We verify the signature (prevents anyone from faking an event).
      4. We read card_id from the event metadata and add one stamp.

    To test locally:
      stripe listen --forward-to localhost:8001/payment/webhook
    Then in another terminal:
      stripe trigger payment_intent.succeeded
    """
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    # If no webhook secret is set (local dev without stripe listen), skip
    # signature verification — never do this in production.
    if STRIPE_WEBHOOK_SECRET:
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, STRIPE_WEBHOOK_SECRET
            )
        except stripe.SignatureVerificationError:
            raise HTTPException(status_code=400, detail="Invalid webhook signature")
    else:
        import json
        event = json.loads(payload)

    if event["type"] == "payment_intent.succeeded":
        intent = event["data"]["object"]
        card_id = int(intent.get("metadata", {}).get("card_id", 0))

        for card in _cards:
            if card["id"] == card_id:
                if card["usedStamps"] < card["totalStamps"]:
                    card["usedStamps"] += 1
                break

    # Always return 200 — Stripe retries on any non-2xx response
    return {"ok": True}


# ---------------------------------------------------------------------------
# Google Auth
# ---------------------------------------------------------------------------

@app.post("/auth/google")
def auth_google(payload: GoogleCredential):
    """Verify a Google ID token and return basic user info."""
    try:
        idinfo = id_token.verify_oauth2_token(
            payload.credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID,
        )
        return {
            "ok": True,
            "user": {
                "email":   idinfo.get("email"),
                "name":    idinfo.get("name"),
                "picture": idinfo.get("picture"),
                "sub":     idinfo.get("sub"),
            },
        }
    except Exception as e:
        print("Google token verification failed:", repr(e))
        traceback.print_exc()
        raise HTTPException(status_code=401, detail="Invalid Google token")
