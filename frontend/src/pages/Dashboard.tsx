/**
 * Dashboard — main home feed.
 * Full Figma-matched layout with dark header + white rounded panel.
 * All styles are inline React.CSSProperties (no Tailwind / CSS classes).
 */

import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

// ── Helpers ──────────────────────────────────────────────────────────────────

interface BusinessCardProps {
  photo: string;
  name: string;
  distance: string;
  rating: string;
  badgeImg?: string;
}

/** A card shown in the horizontal scroll sections. */
function BusinessCard({ photo, name, distance, rating, badgeImg }: BusinessCardProps) {
  const cardStyle: React.CSSProperties = {
    minWidth: 179,
    maxWidth: 179,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  };

  const photoWrapStyle: React.CSSProperties = {
    position: "relative",
    width: 179,
    height: 114,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#e5e5e5",
  };

  const photoStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const badgeStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 6,
    left: 6,
    width: 23,
    height: 23,
    borderRadius: "50%",
    objectFit: "cover",
  };

  return (
    <div style={cardStyle}>
      <div style={photoWrapStyle}>
        <img src={photo} alt={name} style={photoStyle} />
        {badgeImg && <img src={badgeImg} alt="badge" style={badgeStyle} />}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: "#0e0e0e" }}>
        {name}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#727272" }}>
        {distance}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: "#0e0e0e" }}>
        ⭐ {rating}
      </div>
    </div>
  );
}

/** 3×3 stamp grid for the Amy Café preview card. */
function AmyStampGrid() {
  const stamps = [
    { num: "01", filled: false },
    { num: "02", filled: false },
    { num: "03", filled: false },
    { num: "04", filled: true  },
    { num: "05", filled: true  },
    { num: "06", filled: false },
    { num: "07", filled: false },
    { num: "08", filled: false },
    { num: "09", filled: false },
  ];

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 40px)",
    gap: 5,
  };

  const stampBase = (filled: boolean): React.CSSProperties => ({
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid #ccc",
    background: filled
      ? "radial-gradient(circle, #d4a5a0 0%, #e8c5c0 100%)"
      : "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 9,
    fontFamily: "'IBM Plex Mono', monospace",
    color: filled ? "#fff" : "#bbb",
    fontWeight: 500,
  });

  return (
    <div style={gridStyle}>
      {stamps.map((s) => (
        <div key={s.num} style={stampBase(s.filled)}>
          {!s.filled && s.num}
        </div>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {

  // ── Outer page wrapper
  const pageStyle: React.CSSProperties = {
    maxWidth: 393,
    margin: "0 auto",
    minHeight: "100vh",
    backgroundColor: "#0e0e0e",
    position: "relative",
    overflowX: "hidden",
    fontFamily: "'Inter', sans-serif",
  };

  // ── Dark header area
  const headerStyle: React.CSSProperties = {
    backgroundColor: "#0e0e0e",
    padding: "52px 20px 30px 20px",
    minHeight: 230,
    boxSizing: "border-box",
    position: "relative",
    zIndex: 1,
  };

  // location pill
  const locationPillStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    padding: "4px 10px",
    marginBottom: 10,
    cursor: "pointer",
  };

  // search wrapper
  const searchWrapStyle: React.CSSProperties = {
    position: "relative",
    marginBottom: 16,
    width: 308,
  };

  const searchInputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: 15,
    padding: "11px 14px 11px 40px",
    backgroundColor: "transparent",
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "#b7b7b7",
    outline: "none",
  };

  const searchIconWrapStyle: React.CSSProperties = {
    position: "absolute",
    left: 13,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  };

  // greeting
  const hiStyle: React.CSSProperties = {
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 38,
    color: "#ffffff",
    textTransform: "uppercase",
    lineHeight: 1.1,
    marginBottom: 4,
  };

  const taglineStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    fontWeight: 500,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
  };

  // ── White rounded panel
  const whitePanelStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "20px 20px 0 0",
    marginTop: -20,
    position: "relative",
    zIndex: 2,
    padding: "24px 20px 100px 20px",
    minHeight: "calc(100vh - 210px)",
  };

  // section title text
  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 14,
    fontWeight: 500,
    color: "#0e0e0e",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const viewAllStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    color: "#727272",
    textDecoration: "none",
  };

  const sectionHeaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  };

  // Amy Café main card
  const mainCardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 353,
    boxSizing: "border-box",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 5,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    backgroundColor: "#f0f0f0",
    padding: "14px 12px 10px 14px",
    marginBottom: 10,
  };

  const amyNameStyle: React.CSSProperties = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 22,
    fontWeight: 700,
    fontStyle: "italic",
    color: "#0e0e0e",
    lineHeight: 1.1,
    marginBottom: 4,
  };

  const amySubStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: "#3d3d3d",
    maxWidth: 130,
  };

  const pillStyle = (borderColor: string, textColor: string): React.CSSProperties => ({
    border: `0.8px solid ${borderColor}`,
    borderRadius: 20,
    padding: "3px 10px",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 9,
    color: textColor,
    letterSpacing: "0.05em",
  });

  const miniPillStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: "6px 14px",
    fontFamily: "'DM Mono', monospace",
    fontSize: 11,
    color: "#727272",
    marginBottom: 6,
    marginRight: 8,
  };

  const scrollRowStyle: React.CSSProperties = {
    display: "flex",
    gap: 23,
    overflowX: "auto",
    scrollbarWidth: "none",
    paddingBottom: 4,
    msOverflowStyle: "none",
  } as React.CSSProperties;

  return (
    <div style={pageStyle}>

      {/* ── Dark header ──────────────────────────────────────── */}
      <div style={headerStyle}>

        {/* Location pill */}
        <div style={locationPillStyle}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="#f9f9f9" strokeWidth="1" />
            <circle cx="5" cy="5" r="2" fill="#f9f9f9" />
          </svg>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#f9f9f9" }}>
            Carnegie Mellon...
          </span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="#f9f9f9" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Search bar */}
        <div style={searchWrapStyle}>
          <span style={searchIconWrapStyle}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <input
            style={searchInputStyle}
            placeholder="Search Punchcard..."
            readOnly
          />
        </div>

        {/* Greeting */}
        <div style={hiStyle}>Hi Cyndi!</div>
        <div style={taglineStyle}>Thanks for shopping locally &amp; sustainably.</div>
      </div>

      {/* ── White rounded panel ──────────────────────────────── */}
      <div style={whitePanelStyle}>

        {/* ── YOUR REWARDS ── */}
        <div style={sectionHeaderStyle}>
          <span style={sectionTitleStyle}>Your Rewards</span>
          <Link to="/wallet" style={viewAllStyle}>View all</Link>
        </div>

        {/* Amy Café main punchcard */}
        <div style={mainCardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={amyNameStyle}>amy café</div>
              <div style={amySubStyle}>Get your 9th drink for free.</div>
            </div>
            <AmyStampGrid />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={pillStyle("#0e0e0e", "#0e0e0e")}>AMY CAFÉ</span>
            <span style={pillStyle("#0e0e0e", "#0e0e0e")}>07/09</span>
          </div>
        </div>

        {/* Mini punchcard pills */}
        <div style={{ marginBottom: 28 }}>
          <span style={miniPillStyle}>
            TWONA CAFÉ
            <span style={{ color: "#bbb" }}>|</span>
            03/09
          </span>
          <span style={miniPillStyle}>
            HANGHAN
            <span style={{ color: "#bbb" }}>|</span>
            04/09
          </span>
        </div>

        {/* ── TOP PICKS NEAR YOU ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ ...sectionTitleStyle, marginBottom: 12 }}>Top Picks Near You</div>
          <div style={scrollRowStyle}>
            <BusinessCard
              photo="https://www.figma.com/api/mcp/asset/327292d9-56ac-482a-9e27-288d92fcd2d4"
              name="Business Name"
              distance="0.7 mi away"
              rating="5.0"
            />
            <BusinessCard
              photo="https://www.figma.com/api/mcp/asset/c4a43567-7f1f-4162-9eb5-b7f69c15038b"
              name="Business Name"
              distance="1.2 mi away"
              rating="5.0"
            />
          </div>
        </div>

        {/* ── STUDENT-RUN ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ ...sectionTitleStyle, marginBottom: 12 }}>Student-Run</div>
          <div style={scrollRowStyle}>
            <BusinessCard
              photo="https://www.figma.com/api/mcp/asset/f31ab573-64a2-409f-b74f-25a662ac4ba2"
              name="Apple Pi Nails"
              distance="Verified CMU Student"
              rating="5.0"
              badgeImg="https://www.figma.com/api/mcp/asset/85d27f28-185d-4ceb-af67-244f3ead0c9a"
            />
            <BusinessCard
              photo="https://www.figma.com/api/mcp/asset/0cc4518d-7134-43d0-bca1-79dfca585bc5"
              name="Len's Pics / Photoshoots"
              distance="Verified Pitt Student"
              rating="4.9"
              badgeImg="https://www.figma.com/api/mcp/asset/9f9ba251-a304-427a-b53b-ae5e4b805bd1"
            />
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
