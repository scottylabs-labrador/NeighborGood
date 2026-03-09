/**
 * Auth — login and register screens.
 *
 * Design spec (Figma nodes 758:2946 login / 753:1997 register):
 * - Background: #F9F9F9
 * - "LOGIN" / "REGISTER" in large monospace caps (dot-matrix style)
 * - USERNAME/EMAIL + PASSWORD labels (DM Mono, small caps) above underline inputs
 * - "Forgot?" inline with PASSWORD label
 * - "Remember me" checkbox row (login only)
 * - Black rounded-rect "LOG IN" / "SIGN UP" CTA
 * - "or log in with" divider
 * - Google + Apple outlined buttons
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
  const navigate  = useNavigate();
  const googleRef = useRef<HTMLDivElement>(null);
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

      {/* ── Form container ── */}
      <div style={s.container}>

        {/* Page heading */}
        <h1 style={s.heading}>{isLogin ? "Login" : "Register"}</h1>

        {/* ── Fields ── */}
        <div style={s.fields}>
          <InputField label="USERNAME/EMAIL" type="text" />
          <InputField
            label="PASSWORD"
            type="password"
            rightSlot={isLogin ? <span style={s.forgot}>Forgot?</span> : undefined}
          />
        </div>

        {/* Remember me (login only) */}
        {isLogin && (
          <label style={s.rememberRow}>
            <div style={s.checkboxBox}>
              {remember && <span style={s.checkmark}>✓</span>}
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={s.hiddenCheckbox}
              />
            </div>
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
            <>
              <span style={s.footerText}>{"Don't have an account? "}</span>
              <Link to="/register" style={s.footerLink}>Sign up</Link>
            </>
          ) : (
            <>
              <span style={s.footerText}>{"Already have an account? "}</span>
              <Link to="/login" style={s.footerLink}>Log in</Link>
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

const MONO  = "'DM Mono', 'Courier New', Courier, monospace";
const BRAND = "'Bitcount Grid Single', 'Courier New', monospace";
const INTER = "'Inter', Arial, sans-serif";
const GRAY  = "#585858";

const f: Record<string, React.CSSProperties> = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 35,
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    letterSpacing: "0.05em",
    color: GRAY,
    fontFamily: MONO,
    textTransform: "uppercase" as const,
  },
  input: {
    border: "none",
    borderBottom: "1px solid #bbb",
    background: "transparent",
    padding: "0 0 6px",
    fontSize: 15,
    color: "#0E0E0E",
    outline: "none",
    fontFamily: MONO,
    width: "100%",
    boxSizing: "border-box" as const,
  },
};

/* ─────────────────────────────────────────────
   Brand icons
───────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" style={{ marginRight: 8, flexShrink: 0 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 814 1000" style={{ marginRight: 8, flexShrink: 0 }} fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 411.8 32 326.7 32 242.7c0-150.4 98.1-230 192.4-230 55 0 100.9 36.4 135.4 36.4 32.6 0 84.1-38.4 147.7-38.4 23.6 0 108.1 2 166.3 87.3zm-90.5-87.3c-12.1-50.5-44.2-102.5-92.9-131.7-34.2-20.7-76-36.4-117.7-36.4-4.8 0-9.7.3-14.5.9 2 64.8 25.7 125.5 60.5 168.5 35.1 43.2 87.1 73.2 139.6 79.9 7.8 1 15.5 1.3 23.2 1.3-.1-28.1-.9-54.6-2.7-82.5z"/>
      {/* leaf */}
      <path d="M527.3 4.3c-13.5 63.8-62.4 105.6-109.1 102.4 0 0-3.3-52.8 46.5-90.9C513.4-22 563.8 1.5 527.3 4.3z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
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
    fontFamily: MONO,
    padding: "48px 0",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: 311,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },

  /* "LOGIN" / "REGISTER" heading */
  heading: {
    margin: "0 0 109px 0",
    fontSize: 38,
    fontWeight: 400,
    letterSpacing: "0.05em",
    color: BLACK,
    fontFamily: BRAND,
    textAlign: "center" as const,
    textTransform: "uppercase" as const,
  },

  fields: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 14,
    marginBottom: 13,
  },

  forgot: {
    fontSize: 12,
    color: GRAY,
    cursor: "pointer",
    fontFamily: INTER,
    textDecoration: "none",
    textTransform: "none" as const,
  },

  /* "Remember me" */
  rememberRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    marginBottom: 186,
    marginTop: 0,
    position: "relative" as const,
  },
  checkboxBox: {
    width: 13,
    height: 13,
    border: "1px solid #585858",
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    position: "relative" as const,
    cursor: "pointer",
  },
  checkmark: {
    fontSize: 9,
    color: BLACK,
    lineHeight: 1,
  },
  hiddenCheckbox: {
    position: "absolute" as const,
    opacity: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    margin: 0,
  },
  rememberLabel: {
    fontSize: 12,
    color: GRAY,
    fontFamily: INTER,
  },

  errorMsg: {
    color: "crimson",
    fontSize: 11,
    margin: "0 0 10px",
    fontFamily: MONO,
  },

  /* "LOG IN" / "SIGN UP" */
  primaryBtn: {
    width: "100%",
    height: 48,
    borderRadius: 15,
    border: "none",
    background: BLACK,
    color: BG,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.08em",
    cursor: "pointer",
    fontFamily: MONO,
    textTransform: "uppercase" as const,
    marginBottom: 6,
    boxShadow: "inset 0 0 20px rgba(255,255,255,0.25)",
    transition: "opacity 0.15s",
  },

  orText: {
    textAlign: "center" as const,
    fontSize: 14,
    color: GRAY,
    margin: "0 0 6px",
    fontFamily: INTER,
  },

  socialRow: {
    display: "flex",
    gap: 22,
    marginBottom: 78,
  },
  socialBtn: {
    flex: 1,
    height: 45,
    borderRadius: 15,
    border: `1px solid ${BLACK}`,
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 400,
    cursor: "pointer",
    fontFamily: INTER,
    color: BLACK,
  },

  footer: {
    textAlign: "center" as const,
    margin: 0,
    fontFamily: MONO,
    fontSize: 14,
    color: GRAY,
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
    lineHeight: 0,
  },
  footerText: {
    lineHeight: "normal",
  },
  footerLink: {
    color: GRAY,
    textDecoration: "underline",
    fontFamily: MONO,
    letterSpacing: "0.04em",
    lineHeight: "normal",
    textTransform: "uppercase" as const,
  },
};
