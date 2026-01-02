from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import traceback

app = FastAPI()

GOOGLE_CLIENT_ID = "212855412758-c7guc92ug9eloic9a3ib9eknhrapgni1.apps.googleusercontent.com"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class GoogleCredential(BaseModel):
    credential: str

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/auth/google")
def auth_google(payload: GoogleCredential):
    try:
        idinfo = id_token.verify_oauth2_token(
            payload.credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID,
        )
        return {
            "ok": True,
            "user": {
                "email": idinfo.get("email"),
                "name": idinfo.get("name"),
                "picture": idinfo.get("picture"),
                "sub": idinfo.get("sub"),
            },
        }
    except Exception as e:
        print("GOOGLE VERIFY ERROR:", repr(e))
        traceback.print_exc()
        raise HTTPException(status_code=401, detail="Invalid Google token")
