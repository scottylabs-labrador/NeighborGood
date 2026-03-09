/**
 * Wallet page — full list of the user's active punchcards.
 * Matches Figma design 835:2289.
 * All styles are inline React.CSSProperties (no Tailwind / CSS classes).
 */

import BottomNav from "../components/BottomNav";

// ── Stamp grid helpers ────────────────────────────────────────────────────────

interface StampDef {
  num: string;
  /** URL of an image to use as the stamp fill, or null for empty. */
  imgSrc?: string;
  /** Direct background CSS value (for gradients, colors). */
  bg?: string;
  /** Whether this stamp slot is the special star/reward stamp. */
  star?: boolean;
  /** Background-size override for star stamps. */
  starSize?: string;
}

interface StampGridProps {
  stamps: StampDef[];
  columns?: number;
  stampSize?: number;
  emptyBorder?: string;
  emptyBg?: string;
  emptyColor?: string;
}

function StampGrid({
  stamps,
  columns = 3,
  stampSize = 36,
  emptyBorder = "1px solid #ccc",
  emptyBg = "#fff",
  emptyColor = "#bbb",
}: StampGridProps) {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, ${stampSize}px)`,
    gap: 5,
  };

  return (
    <div style={gridStyle}>
      {stamps.map((s) => {
        const hasContent = s.imgSrc || s.bg;
        const style: React.CSSProperties = {
          width: stampSize,
          height: stampSize,
          borderRadius: "50%",
          border: hasContent ? "none" : emptyBorder,
          backgroundColor: hasContent ? "transparent" : emptyBg,
          backgroundImage: s.imgSrc
            ? `url("${s.imgSrc}")`
            : undefined,
          backgroundSize: s.starSize ?? "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 8,
          fontFamily: "'IBM Plex Mono', monospace",
          color: emptyColor,
          flexShrink: 0,
          ...(s.bg && !s.imgSrc ? { background: s.bg } : {}),
        };
        return <div key={s.num} style={style}>{!hasContent && s.num}</div>;
      })}
    </div>
  );
}

// ── Punchcard pill badge ──────────────────────────────────────────────────────

interface PillProps {
  text: string;
  borderColor: string;
  textColor: string;
  fontSize?: number;
}

function Pill({ text, borderColor, textColor, fontSize = 9 }: PillProps) {
  const style: React.CSSProperties = {
    border: `0.8px solid ${borderColor}`,
    borderRadius: 20,
    padding: "3px 10px",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize,
    color: textColor,
    letterSpacing: "0.05em",
    display: "inline-block",
    whiteSpace: "nowrap",
  };
  return <span style={style}>{text}</span>;
}

// ── Individual punchcard layouts ─────────────────────────────────────────────

function AmyCafeCard() {
  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 353,
    minHeight: 215,
    borderRadius: 5,
    border: "1px solid rgba(0,0,0,0.2)",
    backgroundColor: "#f0f0f0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
    padding: "16px 14px 12px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const stamps: StampDef[] = [
    { num: "01" },
    { num: "02" },
    { num: "03" },
    { num: "04", imgSrc: "https://www.figma.com/api/mcp/asset/b7f280be-9d23-4e56-8349-ae7da654b5b7" },
    { num: "05", imgSrc: "https://www.figma.com/api/mcp/asset/f0dcdfb7-1a6c-424d-938c-b0bb0d7a4fe7" },
    { num: "06" },
    { num: "07" },
    { num: "08" },
    { num: "09" },
  ];

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Left */}
        <div style={{ flex: 1, paddingRight: 10 }}>
          <div style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 30,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#0e0e0e",
            lineHeight: 1.1,
            marginBottom: 6,
          }}>
            amy café
          </div>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 13, fontWeight: 500, color: "#3d3d3d" }}>
            Get your 9th drink for free.
          </div>
        </div>
        {/* Right: stamp grid */}
        <StampGrid stamps={stamps} columns={3} stampSize={36} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <Pill text="AMY CAFÉ" borderColor="#0e0e0e" textColor="#0e0e0e" />
        <Pill text="07/09" borderColor="#0e0e0e" textColor="#0e0e0e" />
      </div>
    </div>
  );
}

function HanHanCard() {
  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 353,
    minHeight: 215,
    borderRadius: 5,
    border: "1px solid rgba(128,128,128,0.2)",
    backgroundColor: "#50555f",
    boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
    boxSizing: "border-box",
    padding: "16px 14px 12px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    position: "relative",
  };

  // 10 stamps (3×3 + 1 extra)
  const stamps: StampDef[] = Array.from({ length: 10 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    if (i === 9) {
      return { num, imgSrc: "https://www.figma.com/api/mcp/asset/f97c0811-959a-4468-9702-3c104d0f3d38", star: true, starSize: "80%" };
    }
    return { num, imgSrc: "https://www.figma.com/api/mcp/asset/54ceffa7-5fb6-43ef-ba0d-0a78a49c6ec7" };
  });

  // Rotating decoration images on the right edge
  const decorations = [
    { src: "https://www.figma.com/api/mcp/asset/bc70e849-e262-47b3-89cf-3a1a676a0fc6", top: -10, right: -12, rotate: -46.65 },
    { src: "https://www.figma.com/api/mcp/asset/f3b8dae3-2dc2-4231-b189-88393004ac19", top: 50,  right: -8,  rotate: -46.65 },
    { src: "https://www.figma.com/api/mcp/asset/820134fb-04b8-46c9-9d3a-654a4d605d38", top: 110, right: -14, rotate: -46.65 },
  ];

  return (
    <div style={cardStyle}>
      {/* Decorations */}
      {decorations.map((d, i) => (
        <img
          key={i}
          src={d.src}
          alt=""
          style={{
            position: "absolute",
            top: d.top,
            right: d.right,
            width: 48,
            transform: `rotate(${d.rotate}deg)`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Left */}
        <div style={{ flex: 1, paddingRight: 10 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#e0e0e0", marginBottom: 4 }}>
            han&amp;han
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#e0e0e0", lineHeight: 1, marginBottom: 6 }}>
            汉&amp;한.
          </div>
        </div>
        {/* Stamp grid: 3 cols, 4 rows for 10 stamps */}
        <StampGrid
          stamps={stamps}
          columns={3}
          stampSize={34}
          emptyBorder="1px solid rgba(224,224,224,0.4)"
          emptyBg="transparent"
          emptyColor="#e0e0e0"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <Pill text="HAN&HAN" borderColor="#e0e0e0" textColor="#e0e0e0" />
        <Pill text="04/09" borderColor="#e0e0e0" textColor="#e0e0e0" />
      </div>
    </div>
  );
}

function TwonaCafeCard() {
  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 353,
    minHeight: 215,
    borderRadius: 5,
    border: "1px solid rgba(63,63,63,0.2)",
    backgroundColor: "#04091c",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    boxSizing: "border-box",
    padding: "16px 14px 12px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const stamps: StampDef[] = [
    { num: "01", imgSrc: "https://www.figma.com/api/mcp/asset/1efb9fc0-c8d1-4653-b5d7-8eb561dd0fc6" },
    { num: "02", imgSrc: "https://www.figma.com/api/mcp/asset/d6e7106d-aa9f-4e7a-8e03-02557e11b365" },
    { num: "03", imgSrc: "https://www.figma.com/api/mcp/asset/1efb9fc0-c8d1-4653-b5d7-8eb561dd0fc6" },
    { num: "04" },
    { num: "05" },
    { num: "06" },
    { num: "07" },
    { num: "08" },
    { num: "09" },
  ];

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Left */}
        <div style={{ flex: 1, paddingRight: 10 }}>
          <div style={{
            fontFamily: "'Syne Mono', 'Courier New', monospace",
            fontSize: 34,
            color: "#fef8f2",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
          }}>
            twona<br />cafe
          </div>
        </div>
        {/* Stamp grid */}
        <StampGrid
          stamps={stamps}
          columns={3}
          stampSize={34}
          emptyBorder="1px solid rgba(254,248,242,0.4)"
          emptyBg="transparent"
          emptyColor="rgba(254,248,242,0.5)"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <Pill text="TWONA CAFÉ" borderColor="#ffffff" textColor="#ffffff" />
        <Pill text="03/09" borderColor="#ffffff" textColor="#ffffff" />
      </div>
    </div>
  );
}

function XanhMonoTeaCard() {
  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 353,
    minHeight: 215,
    borderRadius: 5,
    backgroundColor: "#000000",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    boxSizing: "border-box",
    padding: "16px 14px 12px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const stamps: StampDef[] = [
    { num: "01", imgSrc: "https://www.figma.com/api/mcp/asset/1d451602-c175-47cc-9c72-f1e13d59c3ac" },
    { num: "02", imgSrc: "https://www.figma.com/api/mcp/asset/1d451602-c175-47cc-9c72-f1e13d59c3ac" },
    { num: "03" },
    { num: "04" },
    { num: "05" },
    { num: "06" },
    { num: "07" },
    { num: "08" },
    { num: "09" },
  ];

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Left */}
        <div style={{ flex: 1, paddingRight: 10 }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 34,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}>
            XANH<br />MONO<br />TEA
          </div>
        </div>
        {/* Stamp grid */}
        <StampGrid
          stamps={stamps}
          columns={3}
          stampSize={36}
          emptyBorder="1px solid rgba(255,255,255,0.5)"
          emptyBg="transparent"
          emptyColor="rgba(255,255,255,0.4)"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <Pill text="XANHMONOTEA" borderColor="#ffffff" textColor="#ffffff" />
        <Pill text="02/09" borderColor="#ffffff" textColor="#ffffff" />
      </div>
    </div>
  );
}

function AppleGaramondCard() {
  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 353,
    minHeight: 215,
    borderRadius: 5,
    backgroundColor: "#c6c6c6",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
    padding: "16px 14px 12px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const stamps: StampDef[] = [
    { num: "01", imgSrc: "https://www.figma.com/api/mcp/asset/b7f280be-9d23-4e56-8349-ae7da654b5b7" },
    { num: "02" },
    { num: "03" },
    { num: "04" },
    { num: "05" },
    { num: "06" },
    { num: "07" },
    { num: "08" },
    { num: "09" },
  ];

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Left */}
        <div style={{ flex: 1, paddingRight: 10 }}>
          {/* Apple icon + small icon row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <img
              src="https://www.figma.com/api/mcp/asset/caa9c666-0dd3-47d5-9faf-c6a755e56dcb"
              alt="apple"
              style={{ width: 43, height: 43, objectFit: "contain" }}
            />
            <img
              src="https://www.figma.com/api/mcp/asset/3319d096-b4a2-46ea-9bed-c76858c87f3d"
              alt="icon"
              style={{ width: 20, height: 20, objectFit: "contain" }}
            />
          </div>
          <div style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 43,
            fontStyle: "italic",
            fontWeight: 700,
            color: "#ff3c80",
            lineHeight: 0.95,
          }}>
            apple<br />gara<br />mond
          </div>
        </div>
        {/* Stamp grid */}
        <StampGrid
          stamps={stamps}
          columns={3}
          stampSize={34}
          emptyBorder="1px solid rgba(0,0,0,0.2)"
          emptyBg="rgba(255,255,255,0.4)"
          emptyColor="#888"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <Pill text="APPLE GARAMOND" borderColor="#3d3d3d" textColor="#3d3d3d" />
        <Pill text="01/09" borderColor="#3d3d3d" textColor="#3d3d3d" />
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Wallet() {

  const pageStyle: React.CSSProperties = {
    maxWidth: 393,
    margin: "0 auto",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    overflowY: "auto",
    paddingBottom: 80,
    fontFamily: "'Inter', sans-serif",
    position: "relative",
  };

  const headerStyle: React.CSSProperties = {
    padding: "85px 20px 0 20px",
    marginBottom: 6,
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 38,
    color: "#0e0e0e",
    textTransform: "uppercase",
    marginBottom: 4,
    lineHeight: 1,
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    color: "#727272",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: 10,
  };

  const sortRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    marginBottom: 18,
  };

  const sortTextStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    color: "#727272",
  };

  const cardListStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    padding: "0 20px",
  };

  return (
    <div style={pageStyle}>

      {/* ── Header ── */}
      <div style={headerStyle}>
        <div style={titleStyle}>Wallet</div>
        <div style={subtitleStyle}>5 Active Punchcards.</div>
      </div>

      {/* ── Sort row ── */}
      <div style={sortRowStyle}>
        <span style={sortTextStyle}>Sort by: Most Complete</span>
        {/* Filter icon */}
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <line x1="0" y1="2"  x2="20" y2="2"  stroke="#727272" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="14" cy="2" r="2.5" fill="#fff" stroke="#727272" strokeWidth="1.5" />
          <line x1="0" y1="8"  x2="20" y2="8"  stroke="#727272" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="6"  cy="8" r="2.5" fill="#fff" stroke="#727272" strokeWidth="1.5" />
          <line x1="0" y1="14" x2="20" y2="14" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="14" cy="14" r="2.5" fill="#fff" stroke="#727272" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ── Card list ── */}
      <div style={cardListStyle}>
        <AmyCafeCard />
        <HanHanCard />
        <TwonaCafeCard />
        <XanhMonoTeaCard />
        <AppleGaramondCard />
      </div>

      <BottomNav />
    </div>
  );
}
