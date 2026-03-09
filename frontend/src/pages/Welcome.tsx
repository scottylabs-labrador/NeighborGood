/**
 * Welcome screen — matches Figma wireframe (node 753:1997).
 *
 * Layout:
 * - Off-white (#F9F9F9) background
 * - Black rounded-rectangle "wallet" container (333px × ~330px, 30px radius)
 *   └─ 3 stacked gray credit cards (with radial-gradient texture) inside/above it
 *   └─ "PUNCHCARD" + tagline in white at the bottom of the black area
 * - "GET STARTED" (filled black) + "I HAVE AN ACCOUNT" (outlined) buttons below
 */

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={s.page}>

      {/* ── Hero: black wallet container + stacked cards ── */}
      <div style={s.heroArea}>

        {/* Black rounded wallet */}
        <div style={s.wallet}>

          {/* Card C — back, steepest rotation (~8.5°) */}
          <div style={{ ...s.card, ...s.cardC }}>
            <CardTexture />
          </div>

          {/* Card B — middle layer */}
          <div style={{ ...s.card, ...s.cardB }}>
            <CardTexture />
          </div>

          {/* Card A — front */}
          <div style={{ ...s.card, ...s.cardA }}>
            <CardTexture />
          </div>

          {/* Brand text in the lower black area */}
          <div style={s.brandArea}>
            <p style={s.brandName}>PUNCHCARD</p>
            <p style={s.brandTagline}>SHOP SMALL. PUNCH BIG [✦]</p>
          </div>

        </div>
      </div>

      {/* ── Call-to-action buttons ── */}
      <div style={s.btnArea}>
        <button
          style={s.primaryBtn}
          onClick={() => navigate("/register")}
        >
          GET STARTED
        </button>

        <button
          style={s.secondaryBtn}
          onClick={() => navigate("/login")}
        >
          I HAVE AN ACCOUNT
        </button>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   CardTexture — radial dark gradient inside each card
───────────────────────────────────────────── */
function CardTexture() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        background:
          "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(14,14,14,0.82) 0%, transparent 65%)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const MONO  = "'DM Mono', 'Courier New', Courier, monospace";
const BRAND = "'Bitcount Grid Single', 'Courier New', monospace";
const BLACK = "#0E0E0E";
const CARD  = "#E2E3E7";
const BG    = "#F9F9F9";
const LGRAY = "#B7B7B7";

const s: Record<string, React.CSSProperties> = {

  page: {
    position: "relative",
    width: "100%",
    maxWidth: 393,
    minHeight: "100vh",
    margin: "0 auto",
    background: BG,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    fontFamily: MONO,
  },

  /* ── Hero ── */
  heroArea: {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 28,
    boxSizing: "border-box",
  },

  /* Black rounded wallet container */
  wallet: {
    position: "relative",
    width: 333,
    height: 330,
    borderRadius: 30,
    background: BLACK,
    overflow: "visible",
  },

  /* Shared card base */
  card: {
    position: "absolute",
    width: 302,
    height: 194,
    borderRadius: 23,
    background: CARD,
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
  },

  /* Back card — rotated ~8.5°, sits above and slightly left */
  cardC: {
    top: -42,
    left: 15,
    transform: "rotate(8.5deg)",
    transformOrigin: "bottom center",
    zIndex: 1,
  },

  /* Middle card — very slight tilt */
  cardB: {
    top: -10,
    left: 15,
    transform: "rotate(0.3deg)",
    zIndex: 2,
  },

  /* Front card — no tilt, sits lowest in the stack */
  cardA: {
    top: 30,
    left: 15,
    transform: "rotate(0.29deg)",
    zIndex: 3,
  },

  /* PUNCHCARD branding at bottom of wallet */
  brandArea: {
    position: "absolute",
    bottom: 22,
    left: 24,
    zIndex: 4,
  },

  brandName: {
    margin: 0,
    fontSize: 28,
    fontWeight: 400,
    letterSpacing: "0.05em",
    color: BG,
    fontFamily: BRAND,
    lineHeight: 1.1,
    textTransform: "uppercase",
  },

  brandTagline: {
    margin: "5px 0 0",
    fontSize: 10,
    letterSpacing: "0.08em",
    color: LGRAY,
    fontFamily: MONO,
    textTransform: "uppercase",
  },

  /* ── Buttons ── */
  btnArea: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 13,
    padding: "0 44px",
    boxSizing: "border-box",
  },

  primaryBtn: {
    width: "100%",
    maxWidth: 210,
    height: 48,
    borderRadius: 15,
    border: "none",
    background: BLACK,
    color: BG,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.08em",
    cursor: "pointer",
    fontFamily: MONO,
    textTransform: "uppercase",
    transition: "opacity 0.15s",
    boxShadow: "inset 0 0 20px rgba(255,255,255,0.15)",
  },

  secondaryBtn: {
    width: "100%",
    maxWidth: 260,
    height: 48,
    borderRadius: 15,
    background: "transparent",
    border: `1.5px solid ${BLACK}`,
    color: BLACK,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.08em",
    cursor: "pointer",
    fontFamily: MONO,
    textTransform: "uppercase",
  },
};
