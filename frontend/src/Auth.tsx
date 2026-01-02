import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../api";

declare global {
  interface Window {
    google?: any;
  }
}

const GOOGLE_CLIENT_ID =
  "212855412758-c7guc92ug9eloic9a3ib9eknhrapgni1.apps.googleusercontent.com";

export default function AuthPage() {
  const navigate = useNavigate();
  const googleBtnRef = useRef<HTMLDivElement | null>(null);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    setErr("");

    const tryInit = () => {
      if (!window.google?.accounts?.id || !googleBtnRef.current) return false;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            setErr("");
            const credential = response.credential; // this is the Google ID token

            const result = await Auth.google(credential);

            // optional: save user to localStorage
            localStorage.setItem("user", JSON.stringify(result.user));

            // go to dashboard
            navigate("/dashboard");
          } catch (e: any) {
            setErr(e?.message || "Google login failed");
          }
        },
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
        text: "continue_with",
      });

      return true;
    };

    // Sometimes script loads slightly after component mounts
    if (tryInit()) return;

    const t = setInterval(() => {
      if (tryInit()) clearInterval(t);
    }, 200);

    return () => clearInterval(t);
  }, [navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h1>PunchCard</h1>
      <p>Digital punchcards for local rewards</p>

      <div style={{ marginTop: 16 }}>
        <div ref={googleBtnRef} />
        {err && <p style={{ color: "crimson", marginTop: 12 }}>{err}</p>}
      </div>

      {/* You can keep your email/password form below if you want,
          but Google login will now show and work. */}
    </div>
  );
}
