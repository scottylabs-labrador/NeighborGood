"""
PunchCard backend — FastAPI entry point.
Run with: uvicorn app:app --reload --port 8001
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import traceback

app = FastAPI(title="PunchCard API")

# This ID identifies our app to Google. It must match what's registered in
# Google Cloud Console under "OAuth 2.0 Client IDs".
# Do NOT change this unless you've created a new OAuth client.
GOOGLE_CLIENT_ID = (
    "212855412758-c7guc92ug9eloic9a3ib9eknhrapgni1.apps.googleusercontent.com"
)

# ---------------------------------------------------------------------------
# Middleware
# ---------------------------------------------------------------------------

# CORS lets the browser (running on localhost:5173 in dev) talk to this server.
# Without this, the browser blocks cross-origin requests by default.
# In production, replace localhost:5173 with your real frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class GoogleCredential(BaseModel):
    # The raw JWT that Google's sign-in button passes to our frontend callback.
    # We forward it here so the backend can verify it server-side with Google's
    # public keys — the frontend never trusts it directly.
    credential: str

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/health")
def health():
    """
    Quick liveness check.
    Useful for load balancers and local sanity checks:
      curl http://localhost:8001/health
    """
    return {"ok": True}


@app.post("/auth/google")
def auth_google(payload: GoogleCredential):
    """
    Verify a Google ID token and return basic user info.

    Flow:
      1. User clicks "Sign in with Google" in the browser.
      2. Google returns a signed JWT (the credential) to our frontend.
      3. Frontend POSTs that JWT here.
      4. We verify it with Google's servers — this step is what prevents
         a malicious user from forging their own token.
      5. We return the decoded user info for the frontend to store/use.
    """
    try:
        # verify_oauth2_token checks the JWT signature, expiry, and audience
        # (the audience must match GOOGLE_CLIENT_ID, preventing tokens meant
        # for other apps from being accepted here).
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
                # "sub" is Google's stable, permanent ID for this user.
                # Use it as the primary key in your database — email can change,
                # sub never does.
                "sub":     idinfo.get("sub"),
            },
        }
    except Exception as e:
        # Print full traceback server-side for debugging, but only send a
        # generic message to the client so we don't leak internal details.
        print("Google token verification failed:", repr(e))
        traceback.print_exc()
        raise HTTPException(status_code=401, detail="Invalid Google token")