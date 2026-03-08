/**
 * Welcome screen — pixel-faithful recreation of the Figma SVG design.
 *
 * Design spec (extracted from SVG):
 * - Background: #F9F9F9 with subtle crosshatch "+" pattern
 * - Three stacked gray cards (#E2E3E7) with rotated layering + noise/blur effects
 * - Black bottom section with wavy cutout top edge
 * - "PUNCHCARD" + "SHOP SMALL. PUNCH BIG [✦]" dot-matrix branding
 * - Two pill buttons: filled black "GET STARTED", outlined "I HAVE AN ACCOUNT"
 */

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={s.page}>

      {/* ── Crosshatch background pattern ── */}
      <svg style={s.bgPattern} aria-hidden="true">
        <defs>
          <pattern id="cross" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            {/* vertical stroke of "+" */}
            <line x1="11" y1="3" x2="11" y2="19" stroke="#0E0E0E" strokeWidth="0.7" opacity="0.13"/>
            {/* horizontal stroke of "+" */}
            <line x1="3" y1="11" x2="19" y2="11" stroke="#0E0E0E" strokeWidth="0.7" opacity="0.13"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cross)"/>
      </svg>

      {/* ── Three-card stack ── */}
      <div style={s.heroArea}>
        <div style={s.stackWrap}>

          {/* Card C — furthest back, steepest rotation (~8.5°) */}
          <div style={{ ...s.card, ...s.cardC }}>
            <CardTexture top={-30} opacity={0.85} />
          </div>

          {/* Card B — middle layer, ~0.3° tilt */}
          <div style={{ ...s.card, ...s.cardB }}>
            <CardTexture top={-28} opacity={0.82} />
          </div>

          {/* Card A — front card, ~0.3° tilt, fully visible */}
          <div style={{ ...s.card, ...s.cardA }}>
            <CardTexture top={-26} opacity={0.80} />
          </div>

        </div>
      </div>

      {/* ── Black bottom section with curved cutout ── */}
      <div style={s.bottomWrap}>
        {/* SVG wave that transitions page bg → black */}
        <svg
          viewBox="0 0 393 55"
          preserveAspectRatio="none"
          style={s.wave}
          aria-hidden="true"
        >
          {/*
            Recreates the "card-pocket" notch from the Figma SVG:
            flat top on both sides, with a V-shaped dip in the centre
            that mirrors the stacked-card silhouette above.
          */}
          <path
            d="
              M0,55 L0,28
              Q35,28 47,15
              L66,0
              Q85,-18 114,-18
              L196.5,-18
              L279,-18
              Q308,-18 327,0
              L346,15
              Q358,28 393,28
              L393,55 Z
            "
            fill="#0E0E0E"
          />
        </svg>

        <div style={s.blackPanel}>
          <p style={s.brandName}>PUNCHCARD</p>
          <p style={s.brandTagline}>SHOP SMALL. PUNCH BIG [✦]</p>

          {/* Subtle dot-row decoration echoing the dot-matrix in the SVG */}
          <div style={s.dotRow}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} style={s.dot} />
            ))}
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
   CardTexture — the blurred radial dark circle
   that appears inside each card in the Figma
───────────────────────────────────────────── */
function CardTexture({ top, opacity }: { top: number; opacity: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        background: `radial-gradient(
          ellipse 65% 75% at 53% ${top}%,
          rgba(14,14,14,${opacity}) 0%,
          transparent 60%
        )`,
        // Subtle grain overlay
        backdropFilter: "blur(0.5px)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const FONT   = "'Courier New', Courier, monospace";
const BLACK  = "#0E0E0E";
const CARD   = "#E2E3E7";
const BG     = "#F9F9F9";

const s: Record<string, React.CSSProperties> = {

  /* Root page */
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
    fontFamily: FONT,
  },

  /* Crosshatch sits behind everything */
  bgPattern: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },

  /* ── Hero ── */
  heroArea: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: 390,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 58,
    boxSizing: "border-box",
  },

  /* Container that establishes stacking context for the three cards */
  stackWrap: {
    position: "relative",
    width: 302,
    height: 310,
  },

  /* Shared card base */
  card: {
    position: "absolute",
    width: 302,
    height: 194,
    borderRadius: 23,
    background: CARD,
    overflow: "hidden",
    boxShadow: "0 7px 20px rgba(0,0,0,0.12)",
  },

  /* Back card — rotated ~8.5°, peeking out top-left */
  cardC: {
    top: 0,
    left: -8,
    transform: "rotate(8.5deg)",
    transformOrigin: "bottom center",
    zIndex: 1,
  },

  /* Middle card — very slight tilt, offset downward */
  cardB: {
    top: 50,
    left: 0,
    transform: "rotate(0.3deg)",
    zIndex: 2,
  },

  /* Front card — on top, fills the bottom of the stack area */
  cardA: {
    top: 102,
    left: 0,
    transform: "rotate(0.29deg)",
    zIndex: 3,
  },

  /* ── Black bottom section ── */
  bottomWrap: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    /* Pull up so the wave overlaps the card stack slightly */
    marginTop: -20,
  },

  /* The wave SVG */
  wave: {
    display: "block",
    width: "100%",
    height: 55,
    marginBottom: -1, /* prevent hairline gap */
  },

  blackPanel: {
    background: BLACK,
    padding: "4px 30px 32px",
  },

  brandName: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: "0.14em",
    color: BG,
    fontFamily: FONT,
    lineHeight: 1.15,
  },

  brandTagline: {
    margin: "6px 0 14px",
    fontSize: 11,
    letterSpacing: "0.09em",
    color: "#888",
    fontFamily: FONT,
  },

  dotRow: {
    display: "flex",
    gap: 5,
    opacity: 0.25,
  },
  dot: {
    display: "inline-block",
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: BG,
  },

  /* ── Buttons ── */
  btnArea: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    background: BG,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    padding: "28px 44px 52px",
    boxSizing: "border-box",
  },

  primaryBtn: {
    width: "100%",
    maxWidth: 245,
    height: 52,
    borderRadius: 999,
    border: "none",
    background: BLACK,
    color: BG,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.13em",
    cursor: "pointer",
    fontFamily: FONT,
    transition: "opacity 0.15s",
  },

  secondaryBtn: {
    width: "100%",
    maxWidth: 265,
    height: 52,
    borderRadius: 999,
    background: "transparent",
    border: `2px solid ${BLACK}`,
    color: BLACK,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.13em",
    cursor: "pointer",
    fontFamily: FONT,
  },
};