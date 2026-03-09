/**
 * Browse page — discover businesses by category.
 * Matches Figma design 884:1140.
 * All styles are inline React.CSSProperties (no Tailwind / CSS classes).
 */

import BottomNav from "../components/BottomNav";

// ── Category data ─────────────────────────────────────────────────────────────

const CATEGORIES_ROW_1 = [
  { emoji: "🥐", label: "Bakery"   },
  { emoji: "🧋", label: "Boba"     },
  { emoji: "🥟", label: "Food"     },
  { emoji: "🍧", label: "Desserts" },
];

const CATEGORIES_ROW_2 = [
  { emoji: "👖", label: "Thrift"  },
  { emoji: "💄", label: "Beauty"  },
  { emoji: "🥬", label: "Grocery" },
  { emoji: "🐾", label: "Pets"    },
];

// ── Business card ─────────────────────────────────────────────────────────────

interface BusinessCardProps {
  photo: string;
  name: string;
  distance: string;
  rating?: string;
  badgeImg?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

function BusinessCard({
  photo,
  name,
  distance,
  rating = "5.0",
  badgeImg,
  gradientFrom,
  gradientTo,
}: BusinessCardProps) {
  const isGradient = !photo && gradientFrom;

  const photoStyle: React.CSSProperties = {
    width: 179,
    height: 114,
    borderRadius: 20,
    objectFit: "cover",
    display: "block",
    backgroundColor: "#e0e0e0",
    background: isGradient
      ? `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`
      : undefined,
  };

  const photoWrapStyle: React.CSSProperties = {
    position: "relative",
    width: 179,
    height: 114,
    borderRadius: 20,
    overflow: "hidden",
    flexShrink: 0,
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

  const cardStyle: React.CSSProperties = {
    minWidth: 179,
    maxWidth: 179,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  };

  return (
    <div style={cardStyle}>
      <div style={photoWrapStyle}>
        {photo ? (
          <img src={photo} alt={name} style={{ ...photoStyle, background: undefined }} />
        ) : (
          <div style={photoStyle} />
        )}
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

// ── Horizontal scroll section ─────────────────────────────────────────────────

interface ScrollSectionProps {
  title: string;
  children: React.ReactNode;
}

function ScrollSection({ title, children }: ScrollSectionProps) {
  const titleStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 14,
    fontWeight: 500,
    color: "#0e0e0e",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: 12,
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    gap: 23,
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    paddingBottom: 4,
  } as React.CSSProperties;

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={titleStyle}>{title}</div>
      <div style={rowStyle}>{children}</div>
    </div>
  );
}

// ── Category item ─────────────────────────────────────────────────────────────

function CategoryItem({ emoji, label }: { emoji: string; label: string }) {
  const itemStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    width: 60,
    cursor: "pointer",
  };

  const emojiStyle: React.CSSProperties = {
    fontSize: 50,
    lineHeight: 1,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    color: "#0e0e0e",
    textAlign: "center",
    textTransform: "capitalize",
  };

  return (
    <div style={itemStyle}>
      <span style={emojiStyle}>{emoji}</span>
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Browse() {

  const outerStyle: React.CSSProperties = {
    maxWidth: 393,
    margin: "0 auto",
    minHeight: "100vh",
    position: "relative",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#0e0e0e",
  };

  // White content panel that starts ~68px from the top, rounded top corners.
  const whitePanelStyle: React.CSSProperties = {
    backgroundColor: "#f9f9f9",
    borderRadius: "20px 20px 0 0",
    marginTop: 68,
    minHeight: "calc(100vh - 68px)",
    overflowX: "hidden",
    overflowY: "auto",
    paddingBottom: 90,
    position: "relative",
    zIndex: 2,
  };

  const innerPadStyle: React.CSSProperties = {
    padding: "0 20px",
  };

  // "BROWSE" title sits at the top of white panel
  const titleStyle: React.CSSProperties = {
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 38,
    color: "#0e0e0e",
    textTransform: "uppercase",
    paddingTop: 28,
    marginBottom: 14,
    lineHeight: 1,
  };

  // Search bar
  const searchWrapStyle: React.CSSProperties = {
    position: "relative",
    marginBottom: 10,
  };

  const searchBarStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#e2e2e2",
    border: "none",
    borderRadius: 15,
    padding: "11px 14px 11px 40px",
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    color: "#727272",
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

  // Category rows container
  const categoryContainerStyle: React.CSSProperties = {
    marginTop: 55,
    marginBottom: 32,
  };

  const categoryRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 22,
  };

  return (
    <div style={outerStyle}>
      {/* Dark area at top (behind the header) */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 68, backgroundColor: "#0e0e0e", zIndex: 1 }} />

      {/* White scrollable content panel */}
      <div style={whitePanelStyle}>
        <div style={innerPadStyle}>

          {/* Title */}
          <div style={titleStyle}>Browse</div>

          {/* Search bar */}
          <div style={searchWrapStyle}>
            <span style={searchIconWrapStyle}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#727272" strokeWidth="1.4" />
                <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#727272" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <input
              style={searchBarStyle}
              placeholder="Search Punchcard..."
              readOnly
            />
          </div>

          {/* Categories */}
          <div style={categoryContainerStyle}>
            <div style={categoryRowStyle}>
              {CATEGORIES_ROW_1.map((c) => (
                <CategoryItem key={c.label} emoji={c.emoji} label={c.label} />
              ))}
            </div>
            <div style={categoryRowStyle}>
              {CATEGORIES_ROW_2.map((c) => (
                <CategoryItem key={c.label} emoji={c.emoji} label={c.label} />
              ))}
            </div>
          </div>

          {/* TOP PICKS NEAR YOU */}
          <ScrollSection title="Top Picks Near You">
            <BusinessCard
              photo="https://www.figma.com/api/mcp/asset/85b88f6d-eedf-4243-bfb9-947ed49fe3c8"
              name="Business Name"
              distance="0.7 mi away"
              rating="5.0"
            />
            <BusinessCard
              photo="https://www.figma.com/api/mcp/asset/614aa736-47fa-42f0-8beb-c1d3930364c6"
              name="Business Name"
              distance="1.2 mi away"
              rating="5.0"
            />
          </ScrollSection>

          {/* STUDENT-RUN */}
          <ScrollSection title="Student-Run">
            <BusinessCard
              photo="https://www.figma.com/api/mcp/asset/3b1717fe-9616-47ea-9bef-d8349770745f"
              name="Apple Pi Nails"
              distance="Verified CMU Student"
              rating="5.0"
              badgeImg="https://www.figma.com/api/mcp/asset/6dedadf7-81a7-464b-8e34-2c88807da177"
            />
            <BusinessCard
              photo="https://www.figma.com/api/mcp/asset/de182dd3-5682-40d6-9819-a0a8c437c6ac"
              name="Len's Pics"
              distance="Verified Pitt Student"
              rating="4.9"
              badgeImg="https://www.figma.com/api/mcp/asset/0a5ae1cc-8561-42e9-bcda-21568c743a6a"
            />
          </ScrollSection>

          {/* ANOTHER CATEGORY HERE */}
          <ScrollSection title="Another Category Here">
            {/* Gradient placeholder cards — no photos */}
            <BusinessCard
              photo=""
              name="Business Name"
              distance="0.5 mi away"
              rating="4.8"
              gradientFrom="#c9cdd4"
              gradientTo="#a8adb6"
            />
            <BusinessCard
              photo=""
              name="Business Name"
              distance="0.9 mi away"
              rating="4.7"
              gradientFrom="#b8bdc6"
              gradientTo="#9ea3ae"
            />
          </ScrollSection>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}
