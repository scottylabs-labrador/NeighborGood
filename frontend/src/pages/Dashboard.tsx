/**
 * Dashboard — main home feed shown after login.
 *
 * Kept intentionally thin: it orchestrates layout and delegates
 * each visual chunk to a named sub-component below. This means
 * you can read the JSX like a table of contents for the screen.
 */

import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  return (
    <div>
      {/* ── Top frame (purple header area) ───────────────────── */}
      <div id="top-frame">
        <LocationDropdown />
        <SearchBar />
        <div className="zalando-sans-semiexpanded-welcome-message">
          {/* TODO: replace hardcoded name with the logged-in user's name
              from localStorage ("user" key) or an auth context */}
          <h1>Hi Reallycool Name!</h1>
        </div>
      </div>

      {/* ── Punchcard stack preview ───────────────────────────── */}
      <div id="punchcard-frame">
        <div className="rewards">
          <h1>Your Rewards</h1>
          {/* "View All" takes the user to the full Wallet page */}
          <Link to="/wallet" className="viewall-link">
            <h1 className="viewall">View All</h1>
          </Link>
        </div>

        {/* The whole stack is a link — tapping anywhere on it opens the wallet */}
        <Link to="/wallet" className="punchcard-stack-link">
          <PunchCardStack />
        </Link>
      </div>

      {/* ── Nearby businesses by category ────────────────────── */}
      <div className="category-section">
        <div className="category">
          {/* TODO: make this a dynamic category label (e.g. "Coffee", "Food") */}
          <h1>Category</h1>
        </div>
        <BusinessCardScroller />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
//
// These are declared in the same file (not exported) because they're tightly
// coupled to Dashboard's layout and wouldn't make sense anywhere else.
// If any of these grow significantly, move them to src/components/.
// ---------------------------------------------------------------------------

/** Dropdown showing the user's selected neighbourhood/campus. */
function LocationDropdown() {
  return (
    <div className="dropdown location-name">
      {/* TODO: populate options and selection from user profile/settings */}
      <button className="dropbtn">Carnegie Mellon University</button>
      <div className="dropdown-content">
        <a href="#">Location 1</a>
        <a href="#">Location 2</a>
        <a href="#">Location 3</a>
      </div>
    </div>
  );
}

/**
 * Three layered cards giving a "stack of cards" visual.
 * stack-card-1 is on top (fully detailed), 2 and 3 peek behind it.
 * The CSS in dashboard.css handles the offset/scale/opacity.
 */
function PunchCardStack() {
  return (
    <div className="punchcard-stack">
      {/* Bottom of the stack — just the footer is visible */}
      <div className="punchcard-item stack-card-3">
        <div className="card-footer">
          <span>Biz name 3</span>
          <span className="cool-logo">LOGO</span>
        </div>
      </div>

      {/* Middle of the stack — just the footer is visible */}
      <div className="punchcard-item stack-card-2">
        <div className="card-footer">
          <span>Biz name 2</span>
          <span className="cool-logo">LOGO</span>
        </div>
      </div>

      {/* Top card — shows real stamp progress so the user gets value at a glance */}
      <div className="punchcard-item stack-card-1">
        {/* Row 1: all 5 filled */}
        <div className="stamp-row">
          {["✓", "✓", "✓", "✓", "✓"].map((s, i) => (
            <div key={i} className="stamp checked">{s}</div>
          ))}
        </div>
        {/* Row 2: 1 filled, 3 empty, then the reward star */}
        <div className="stamp-row">
          <div className="stamp checked">✓</div>
          <div className="stamp" />
          <div className="stamp" />
          <div className="stamp" />
          <div className="reward-star">⭐</div>
        </div>
        <div className="card-footer">
          <span>Biz name 1</span>
          <span className="cool-logo">LOGO</span>
        </div>
      </div>
    </div>
  );
}

// TODO: replace with a GET /businesses?nearby=true API call.
const MOCK_BUSINESSES = [
  { name: "Business Name", rating: 5.0 },
  { name: "Another Shop",  rating: 4.8 },
  { name: "Local Cafe",    rating: 4.9 },
  { name: "Bookstore",     rating: 5.0 },
];

/** Horizontally scrollable row of nearby business cards. */
function BusinessCardScroller() {
  return (
    <div className="scroll-container">
      {MOCK_BUSINESSES.map(biz => (
        // TODO: wrap each card in a <Link to={`/business/${biz.id}`}> once
        // business detail pages exist.
        <div key={biz.name} className="category-card">
          {/* Grey box until real photos are loaded from the backend */}
          <div className="card-image-placeholder" />
          <div className="card-content">
            <p className="name">{biz.name}</p>
            <p className="rating">⭐ {biz.rating} rating</p>
          </div>
        </div>
      ))}
    </div>
  );
}