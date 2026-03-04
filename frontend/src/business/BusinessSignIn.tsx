/**
 * BusinessSignIn — Sign-in page for business dashboard.
 * Matches Figma design: node-id=832-3006
 *
 * Route: /business/login  (add to App.tsx)
 */

import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BusinessSignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // TODO: wire to POST /auth/business/login
    console.log("Business sign-in:", data);
    navigate("/business/dashboard");
  };

  return (
    <div style={styles.page}>
      {/* Dark blurred ellipse background */}
      <div style={styles.bgEllipse} />

      {/* Card */}
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to PunchCard!</h1>

        <p style={styles.subRow}>
          DON'T HAVE AN ACCOUNT?{" "}
          <Link to="/business/register" style={styles.createLink}>
            CREATE ONE
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username */}
          <div style={styles.field}>
            <input
              {...register("username")}
              placeholder="USERNAME :"
              style={styles.input}
              autoComplete="username"
            />
            {errors.username && (
              <span style={styles.error}>{errors.username.message}</span>
            )}
          </div>

          {/* Password */}
          <div style={{ ...styles.field, position: "relative" }}>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD :"
              style={{ ...styles.input, paddingRight: 40 }}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              style={styles.eyeBtn}
              aria-label="Toggle password visibility"
            >
              <EyeIcon open={showPassword} />
            </button>
            {errors.password && (
              <span style={styles.error}>{errors.password.message}</span>
            )}
          </div>

          {/* Remember me */}
          <label style={styles.checkLabel}>
            <input
              {...register("rememberMe")}
              type="checkbox"
              style={styles.checkbox}
            />
            Remember me
          </label>

          {/* Log in button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={styles.submitBtn}
          >
            {isSubmitting ? "LOGGING IN…" : "LOG IN"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.dividerRow}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <div style={styles.dividerLine} />
        </div>

        {/* OAuth buttons */}
        <button style={styles.oauthBtn} type="button">
          <GoogleIcon />
          Google Sign in
        </button>
        <button style={{ ...styles.oauthBtn, marginTop: 16 }} type="button">
          <AppleIcon />
          Apple Sign In
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" style={{ marginRight: 12 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 814 1000" style={{ marginRight: 12 }}>
      <path fill="#000" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="#676464" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1 7C1 7 4 1 10 1s9 6 9 6-3 6-9 6S1 7 1 7z"/>
      <circle cx="10" cy="7" r="2.5"/>
    </svg>
  ) : (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="#676464" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1 1l18 14M8.5 3.5C9 3.2 9.5 3 10 3c6 0 9 6 9 6s-1 2-3 4M4.5 5C2.5 6.5 1 9 1 9s3 6 9 6c2 0 3.8-.7 5.2-1.7"/>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    background: "rgba(213, 213, 213, 0.33)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Courier New', Courier, monospace",
    boxSizing: "border-box",
  },
  bgEllipse: {
    position: "absolute",
    left: "-15%",
    top: "50%",
    transform: "translateY(-50%)",
    width: "55%",
    height: "80%",
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 45%, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
    filter: "blur(2px)",
  },
  card: {
    position: "relative",
    zIndex: 2,
    background: "#DCDCDC",
    borderRadius: 24,
    padding: "48px 56px",
    width: 560,
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
    boxSizing: "border-box",
  },
  title: {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 28,
    fontWeight: 700,
    color: "#000",
    marginBottom: 12,
    marginTop: 0,
    lineHeight: 1.3,
  },
  subRow: {
    fontSize: 12,
    letterSpacing: "0.05em",
    color: "#333",
    marginBottom: 36,
    fontFamily: "'Courier New', Courier, monospace",
  },
  createLink: {
    color: "#000",
    fontWeight: 700,
    textDecoration: "underline",
    cursor: "pointer",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 28,
  },
  input: {
    background: "transparent",
    border: "none",
    borderBottom: "1.5px solid #999",
    outline: "none",
    fontSize: 13,
    fontFamily: "'Courier New', Courier, monospace",
    letterSpacing: "0.08em",
    color: "#000",
    padding: "8px 0",
    width: "100%",
    boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute",
    right: 0,
    top: 8,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  error: {
    color: "crimson",
    fontSize: 11,
    marginTop: 4,
    fontFamily: "'Courier New', Courier, monospace",
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    fontFamily: "Arial, sans-serif",
    color: "#333",
    cursor: "pointer",
    marginBottom: 28,
  },
  checkbox: {
    width: 18,
    height: 18,
    accentColor: "#000",
    cursor: "pointer",
  },
  submitBtn: {
    width: "100%",
    padding: "18px 0",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    fontSize: 14,
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 700,
    letterSpacing: "0.1em",
    cursor: "pointer",
    marginBottom: 24,
  },
  dividerRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "#999",
  },
  dividerText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Arial, sans-serif",
  },
  oauthBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "14px 0",
    borderRadius: 999,
    border: "1.5px solid #999",
    background: "#fff",
    fontSize: 15,
    fontFamily: "Arial, sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    color: "#000",
  },
};
