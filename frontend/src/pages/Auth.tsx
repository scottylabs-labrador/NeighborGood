/**
 * Auth page — handles both login and register in one component.
 *
 * Why one component for two routes?
 * The Google sign-in flow is identical regardless of whether the user is
 * "logging in" or "registering" — Google doesn't distinguish. The `mode`
 * prop just controls the heading copy so the page feels appropriate for
 * each context.
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as AuthAPI } from "../api";

// Tell TypeScript that window.google exists at runtime (injected by the
// Google Identity Services script tag in index.html). Without this, TS
// would complain that window.google doesn't exist on the Window type.
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (el: HTMLElement, options: object) => void;
        };
      };
    };
  }
}

// Must match the OAuth 2.0 Client ID in Google Cloud Console.
// If you rotate this, update it in backend/app.py too — both must agree.
const GOOGLE_CLIENT_ID =
  "212855412758-c7guc92ug9eloic9a3ib9eknhrapgni1.apps.googleusercontent.com";

interface Props {
  mode: "login" | "register";
}

export default function Auth({ mode }: Props) {
  const navigate = useNavigate();

  // Ref to the div where Google will inject its sign-in button.
  // We use a ref (not a state) because we don't want a re-render when it's set.
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");

    // Attempts to initialise the Google button. Returns false if the Google
    // script hasn't finished loading yet (it loads asynchronously in index.html).
    const init = () => {
      if (!window.google?.accounts?.id || !googleBtnRef.current) return false;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        // This callback fires after the user picks a Google account.
        // `response.credential` is a signed JWT we send to our backend.
        callback: async (response: { credential: string }) => {
          try {
            setError("");
            const { user } = await AuthAPI.google(response.credential);
            // Persist the user so other pages can read it without re-fetching.
            // TODO: replace with a proper auth context or session cookie.
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Google login failed");
          }
        },
      });

      // renderButton injects Google's styled button HTML into our ref div.
      // We don't draw this button ourselves — Google controls its appearance
      // to meet their branding requirements.
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
        text: "continue_with",
      });

      return true;
    };

    // Try immediately; if the script isn't ready, retry every 200ms.
    // The interval is cleared as soon as init() succeeds, so it doesn't
    // keep running after the button is rendered.
    if (!init()) {
      const interval = setInterval(() => { if (init()) clearInterval(interval); }, 200);
      // Cleanup: if the component unmounts before the script loads, stop polling.
      return () => clearInterval(interval);
    }
  }, [navigate]); // Re-run only if navigate changes (it won't in practice)

  const heading = mode === "register" ? "Create an account" : "Welcome back";

  return (
    <div style={{ padding: 24 }}>
      <h1>PunchCard</h1>
      <p>{heading}</p>

      <div style={{ marginTop: 16 }}>
        {/* Google injects its button HTML here via renderButton() above */}
        <div ref={googleBtnRef} />
        {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}
      </div>
    </div>
  );
}