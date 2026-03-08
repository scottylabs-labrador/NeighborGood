/**
 * Auth — login and register screens.
 *
 * Design spec (from Figma screenshot):
 * - Background: #F9F9F9 with crosshatch "+" pattern (matches Welcome screen)
 * - "LOGIN" / "REGISTER" in large spaced monospace caps
 * - USERNAME/EMAIL + PASSWORD labels in small caps above underline-only inputs
 * - "Forgot?" inline with PASSWORD label
 * - "Remember me" checkbox row (login only)
 * - Black pill "LOG IN" / "SIGN UP" primary CTA
 * - "or log in with" divider
 * - Google + Apple pill buttons (white, bordered)
 * - Footer: "DON'T HAVE AN ACCOUNT? SIGN UP" / "ALREADY HAVE AN ACCOUNT? LOG IN"
 */

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth as AuthAPI } from "../api";

/* ── Google SDK type shim ── */
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (el: HTMLElement, opts: object) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID =
  "212855412758-c7guc92ug9eloic9a3ib9eknhrapgni1.apps.googleusercontent.com";

interface Props {
  mode: "login" | "register";
}

export default function Auth({ mode }: Props) {
  const navigate   = useNavigate();
  const googleRef  = useRef<HTMLDivElement>(null);
  const [remember, setRemember] = useState(false);
  const [error, setError]       = useState("");

  const isLogin = mode === "login";

  /* ── Wire up Google one-tap ── */
  useEffect(() => {
    setError("");
    const init = () => {
      if (!window.google?.accounts?.id || !googleRef.current) return false;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (res: { credential: string }) => {
          try {
            const { user } = await AuthAPI.google(res.credential);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Google sign-in failed");
          }
        },
      });
      // Render into hidden div so SDK is initialised; we use our own button styling.
      window.google.accounts.id.renderButton(googleRef.current, {
        theme: "outline", size: "large", width: 1,
      });
      return true;
    };

    if (!init()) {
      const t = setInterval(() => { if (init()) clearInterval(t); }, 200);
      return () => clearInterval(t);
    }
  }, [navigate]);

  return (
    <div style={s.page}>

      {/* Crosshatch background — same pattern as Welcome screen */}
      <svg style={s.bgPattern} aria-hidden="true">
        <defs>
          <pattern id="cross2" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <line x1="11" y1="3" x2="11" y2="19" stroke="#0E0E0E" strokeWidth="0.7" opacity="0.12"/>
            <line x1="3" y1="11" x2="19" y2="11" stroke="#0E0E0E" strokeWidth="0.7" opacity="0.12"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cross2)"/>
      </svg>

      {/* ── Form card ── */}
      <div style={s.card}>

        {/* Page heading */}
        <h1 style={s.heading}>{isLogin ? "LOGIN" : "REGISTER"}</h1>

        {/* ── Fields ── */}
        <div style={s.fields}>
          <InputField label="USERNAME / EMAIL" type="text" />
          <InputField
            label="PASSWORD"
            type="password"
            rightSlot={isLogin ? <span style={s.forgot}>Forgot?</span> : undefined}
          />
        </div>

        {/* Remember me (login only) */}
        {isLogin && (
          <label style={s.rememberRow}>
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              style={s.checkbox}
            />
            <span style={s.rememberLabel}>Remember me</span>
          </label>
        )}

        {/* Error message */}
        {error && <p style={s.errorMsg}>{error}</p>}

        {/* Primary CTA */}
        <button style={s.primaryBtn} onClick={() => navigate("/dashboard")}>
          {isLogin ? "LOG IN" : "SIGN UP"}
        </button>

        {/* Social sign-in */}
        <p style={s.orText}>or log in with</p>

        <div style={s.socialRow}>
          <button style={s.socialBtn}>
            <GoogleIcon /> Google
          </button>
          <button style={s.socialBtn}>
            <AppleIcon /> Apple
          </button>
        </div>

        {/* Hidden Google SDK mount point */}
        <div ref={googleRef} style={{ display: "none" }} />

        {/* Footer switch link */}
        <p style={s.footer}>
          {isLogin ? (
            <>DON&apos;T HAVE AN ACCOUNT?{" "}
              <Link to="/register" style={s.footerLink}>SIGN UP</Link>
            </>
          ) : (
            <>ALREADY HAVE AN ACCOUNT?{" "}
              <Link to="/login" style={s.footerLink}>LOG IN</Link>
            </>
          )}
        </p>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   InputField sub-component
───────────────────────────────────────────── */
interface FieldProps {
  label: string;
  type: string;
  rightSlot?: React.ReactNode;
}

function InputField({ label, type, rightSlot }: FieldProps) {
  return (
    <div style={f.wrap}>
      <div style={f.labelRow}>
        <label style={f.label}>{label}</label>
        {rightSlot}
      </div>
      <input type={type} style={f.input} autoComplete="off" />
    </div>
  );
}

const f: Record<string, React.CSSProperties> = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  label: {
    fontSize: 10,
    letterSpacing: "0.12em",
    color: "#666",
    fontFamily: "'Courier New', Courier, monospace",
    textTransform: "uppercase" as const,
  },
  input: {
    border: "none",
    borderBottom: "1.5px solid #bbb",
    background: "transparent",
    padding: "9px 0 6px",
    fontSize: 15,
    color: "#0E0E0E",
    outline: "none",
    fontFamily: "'Courier New', Courier, monospace",
    width: "100%",
    boxSizing: "border-box" as const,
  },
};

/* ─────────────────────────────────────────────
   Brand icons
───────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" style={{ marginRight: 7, flexShrink: 0 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="17" viewBox="0 0 814 1000" style={{ marginRight: 7, flexShrink: 0 }} fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 411.8 32 326.7 32 242.7c0-150.4 98.1-230 192.4-230 55 0 100.9 36.4 135.4 36.4 32.6 0 84.1-38.4 147.7-38.4 23.6 0 108.1 2 166.3 87.3zm-90.5-87.3c-12.1-50.5-44.2-102.5-92.9-131.7-34.2-20.7-76-36.4-117.7-36.4-4.8 0-9.7.3-14.5.9 2 64.8 25.7 125.5 60.5 168.5 35.1 43.2 87.1 73.2 139.6 79.9 7.8 1 15.5 1.3 23.2 1.3-.1-28.1-.9-54.6-2.7-82.5z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const FONT  = "'Courier New', Courier, monospace";
const BLACK = "#0E0E0E";
const BG    = "#F9F9F9";

const s: Record<string, React.CSSProperties> = {

  page: {
    position: "relative",
    width: "100%",
    maxWidth: 393,
    minHeight: "100vh",
    margin: "0 auto",
    background: BG,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FONT,
    padding: "32px 0",
    boxSizing: "border-box",
  },

  bgPattern: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },

  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 320,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },

  /* "LOGIN" / "REGISTER" */
  heading: {
    margin: "0 0 40px 0",
    fontSize: 38,
    fontWeight: 700,
    letterSpacing: "0.22em",
    color: BLACK,
    fontFamily: FONT,
    textAlign: "center" as const,
    /* Slight tracking gives the dot-matrix LED feel */
  },

  fields: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 30,
    marginBottom: 18,
  },

  forgot: {
    fontSize: 10,
    letterSpacing: "0.06em",
    color: "#999",
    cursor: "pointer",
    fontFamily: FONT,
    textDecoration: "none",
  },

  /* "Remember me" */
  rememberRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    marginBottom: 28,
    marginTop: 6,
  },
  checkbox: {
    width: 13,
    height: 13,
    accentColor: BLACK,
    cursor: "pointer",
    flexShrink: 0,
  },
  rememberLabel: {
    fontSize: 11,
    color: "#666",
    letterSpacing: "0.04em",
    fontFamily: FONT,
  },

  errorMsg: {
    color: "crimson",
    fontSize: 11,
    margin: "0 0 10px",
    fontFamily: FONT,
  },

  /* "LOG IN" / "SIGN UP" */
  primaryBtn: {
    width: "100%",
    height: 52,
    borderRadius: 999,
    border: "none",
    background: BLACK,
    color: BG,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.15em",
    cursor: "pointer",
    fontFamily: FONT,
    marginTop: 4,
    marginBottom: 20,
    transition: "opacity 0.15s",
  },

  orText: {
    textAlign: "center" as const,
    fontSize: 11,
    color: "#999",
    letterSpacing: "0.06em",
    margin: "0 0 14px",
    fontFamily: FONT,
  },

  socialRow: {
    display: "flex",
    gap: 12,
    marginBottom: 36,
  },
  socialBtn: {
    flex: 1,
    height: 48,
    borderRadius: 999,
    border: "1.5px solid #ccc",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: FONT,
    letterSpacing: "0.04em",
    color: BLACK,
    gap: 0,
  },

  footer: {
    textAlign: "center" as const,
    fontSize: 10,
    color: "#999",
    letterSpacing: "0.09em",
    margin: 0,
    fontFamily: FONT,
  },
  footerLink: {
    color: BLACK,
    fontWeight: 700,
    textDecoration: "underline",
    letterSpacing: "0.09em",
  },
};