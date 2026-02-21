/** Landing screen — shown to users who aren't logged in. */

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <img
        src="/assets/group58.svg"
        alt="Punchcard welcome illustration"
        style={styles.hero}
      />

      <button style={styles.primaryBtn} onClick={() => navigate("/register")}>
        Get started
      </button>

      <button style={styles.secondaryBtn} onClick={() => navigate("/login")}>
        I have an account
      </button>
    </div>
  );
}

// Styles scoped to this component — no global side-effects
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f4ff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    width: 360,
    maxWidth: "90vw",
    height: "auto",
    marginBottom: 40,
  },
  primaryBtn: {
    width: 220,
    height: 52,
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(180deg, #3f3ca8 0%, #252178 100%)",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
    marginBottom: 16,
  },
  secondaryBtn: {
    width: 240,
    height: 52,
    borderRadius: 999,
    background: "transparent",
    border: "2px solid rgba(52, 44, 140, 0.6)",
    color: "rgba(52, 44, 140, 1)",
    fontSize: 16,
    cursor: "pointer",
  },
};