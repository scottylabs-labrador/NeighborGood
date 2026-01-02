import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Main welcome image */}
      <img
        src="/assets/group58.svg"
        alt="Punchcard welcome"
        style={styles.hero}
      />

      {/* Buttons */}
      <button style={styles.primary} onClick={() => navigate("/register")}>
        Get started
      </button>

      <button style={styles.secondary} onClick={() => navigate("/login")}>
        I have an account
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f4ff", // light purple background
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

  primary: {
    width: 220,
    height: 52,
    borderRadius: 999,
    border: "none",
    background:
      "linear-gradient(180deg, rgba(63,60,168,1) 0%, rgba(37,33,120,1) 100%)",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
    marginBottom: 16,
  },

  secondary: {
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
