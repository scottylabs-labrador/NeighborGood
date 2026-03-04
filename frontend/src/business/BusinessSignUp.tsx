/**
 * BusinessSignUp — Web sign-up page for business dashboard.
 * Matches Figma design: node-id=832-2841
 *
 * Route: /business/register  (add to App.tsx)
 */
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "At least 8 characters"),
  agreeEmails: z.boolean().optional(),
  agreeTerms: z.boolean().refine((v) => v === true, {
    message: "You must agree to the Terms of Use",
  }),
});

type FormData = z.infer<typeof schema>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BusinessSignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // TODO: wire to POST /auth/business/register
    console.log("Business sign-up:", data);
    navigate("/business/dashboard");
  };

  return (
    <div style={styles.page}>
      {/* ── Blurred dark ellipse background (matches Figma illustration) ── */}
      <div style={styles.bgEllipse} />

      {/* ── Sign-up card ── */}
      <div style={styles.card}>
        <h1 style={styles.title}>CREATE YOUR PUNCHCARD ACCOUNT</h1>

        <p style={styles.signinRow}>
          ALREADY HAVE AN ACCOUNT?{" "}
          <Link to="/business/login" style={styles.signinLink}>
            SIGN IN
          </Link>
        </p>

        {/* ── OAuth buttons ── */}
        <div style={styles.oauthRow}>
          <button style={styles.oauthBtn} type="button">
            <GoogleIcon />
            Google
          </button>
          <button style={styles.oauthBtn} type="button">
            <AppleIcon />
            Apple
          </button>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name row */}
          <div style={styles.nameRow}>
            <div style={styles.fieldHalf}>
              <input
                {...register("firstName")}
                placeholder="FIRST NAME"
                style={styles.input}
              />
              {errors.firstName && (
                <span style={styles.error}>{errors.firstName.message}</span>
              )}
            </div>
            <div style={styles.fieldHalf}>
              <input
                {...register("lastName")}
                placeholder="LAST NAME"
                style={styles.input}
              />
              {errors.lastName && (
                <span style={styles.error}>{errors.lastName.message}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div style={styles.field}>
            <input
              {...register("email")}
              type="email"
              placeholder="EMAIL"
              style={styles.input}
            />
            {errors.email && (
              <span style={styles.error}>{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div style={{ ...styles.field, position: "relative" }}>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              style={{ ...styles.input, paddingRight: 40 }}
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

          {/* Checkboxes */}
          <div style={styles.checkboxGroup}>
            <label style={styles.checkLabel}>
              <input
                {...register("agreeEmails")}
                type="checkbox"
                style={styles.checkbox}
              />
              I agree to receive occasional emails with updates and news.
            </label>
            <label style={styles.checkLabel}>
              <input
                {...register("agreeTerms")}
                type="checkbox"
                style={styles.checkbox}
              />
              I agree with the Terms of Use. I acknowledge the Privacy Policy.
            </label>
            {errors.agreeTerms && (
              <span style={styles.error}>{errors.agreeTerms.message}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={styles.submitBtn}
          >
            {isSubmitting ? "CREATING…" : "CREATE ACCOUNT"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Icons (inline SVG — no extra dependency)
// ---------------------------------------------------------------------------

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" style={{ marginRight: 8 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 814 1000" style={{ marginRight: 8 }}>
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
    justifyContent: "flex-end",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Courier New', Courier, monospace",
    boxSizing: "border-box",
  },
  bgEllipse: {
    position: "absolute",
    left: "-10%",
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
    background: "#E8E8E8",
    borderRadius: 24,
    padding: "48px 56px",
    width: 560,
    marginRight: "8%",
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
    boxSizing: "border-box",
  },
  title: {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 0,
    lineHeight: 1.3,
  },
  signinRow: {
    textAlign: "center",
    fontSize: 12,
    letterSpacing: "0.05em",
    color: "#333",
    marginBottom: 24,
    fontFamily: "'Courier New', Courier, monospace",
  },
  signinLink: {
    color: "#000",
    fontWeight: 700,
    textDecoration: "underline",
    cursor: "pointer",
  },
  oauthRow: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    marginBottom: 32,
  },
  oauthBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 28px",
    borderRadius: 999,
    border: "1.5px solid #B1B1B1",
    background: "#E8E8E8",
    fontSize: 15,
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 500,
    cursor: "pointer",
    color: "#000",
    letterSpacing: "0.02em",
  },
  nameRow: {
    display: "flex",
    gap: 20,
    marginBottom: 0,
  },
  fieldHalf: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  input: {
    background: "transparent",
    border: "none",
    borderBottom: "1.5px solid #B1B1B1",
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
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 32,
    marginTop: 8,
  },
  checkLabel: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 13,
    fontFamily: "Arial, sans-serif",
    color: "#333",
    cursor: "pointer",
    lineHeight: 1.4,
  },
  checkbox: {
    marginTop: 2,
    accentColor: "#000",
    width: 16,
    height: 16,
    flexShrink: 0,
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
  },
};
