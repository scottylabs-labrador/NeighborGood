import { Link, useLocation } from "react-router-dom";

const tabs = [
  { label: "Home",    path: "/dashboard" },
  { label: "Wallet",  path: "/wallet"    },
  { label: "Browse",  path: "/browse"    },
  { label: "Profile", path: "/profile"   },
] as const;

// ── SVG icons ──────────────────────────────────────────────────────────────

function HomeIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        fill="#0e0e0e"
      />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        stroke="#0e0e0e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WalletIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="15" rx="2" fill="#0e0e0e" />
      <rect x="2" y="8" width="20" height="4" fill="#0e0e0e" />
      <rect x="14" y="13" width="4" height="2.5" rx="1" fill="white" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="15" rx="2" stroke="#0e0e0e" strokeWidth="1.5" />
      <path d="M2 9H22" stroke="#0e0e0e" strokeWidth="1.5" />
      <rect x="14" y="13" width="4" height="2.5" rx="1" fill="#0e0e0e" />
    </svg>
  );
}

function BrowseIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="6"  x2="14" y2="6"  stroke="#0e0e0e" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="3" y1="12" x2="14" y2="12" stroke="#0e0e0e" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="3" y1="18" x2="14" y2="18" stroke="#0e0e0e" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18.5" cy="15.5" r="3" stroke="#0e0e0e" strokeWidth="2.5" />
      <line x1="20.5" y1="18" x2="22" y2="19.5" stroke="#0e0e0e" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="6"  x2="14" y2="6"  stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="12" x2="14" y2="12" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="18" x2="14" y2="18" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18.5" cy="15.5" r="3" stroke="#0e0e0e" strokeWidth="1.5" />
      <line x1="20.5" y1="18" x2="22" y2="19.5" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" fill="#0e0e0e" />
      <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#0e0e0e" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="#0e0e0e" strokeWidth="1.5" />
      <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function renderIcon(label: string, active: boolean) {
  switch (label) {
    case "Home":    return <HomeIcon    active={active} />;
    case "Wallet":  return <WalletIcon  active={active} />;
    case "Browse":  return <BrowseIcon  active={active} />;
    case "Profile": return <ProfileIcon active={active} />;
    default:        return null;
  }
}

// ── Component ───────────────────────────────────────────────────────────────

export default function BottomNav() {
  const { pathname } = useLocation();

  const navStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 393,
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    zIndex: 100,
  };

  const tabStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    textDecoration: "none",
    flex: 1,
  };

  const labelStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "'DM Mono', monospace",
    fontSize: 9,
    fontWeight: active ? 500 : 400,
    color: active ? "#0e0e0e" : "#727272",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  });

  return (
    <nav style={navStyle}>
      {tabs.map(({ label, path }) => {
        const active = pathname === path || (path === "/dashboard" && pathname === "/");
        return (
          <Link key={path} to={path} style={tabStyle}>
            {renderIcon(label, active)}
            <span style={labelStyle(active)}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
