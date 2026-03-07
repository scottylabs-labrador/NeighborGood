/**
 * Wallet page — React replacement for the static wallet.html file.
 *
 * Each card is collapsed by default showing only the business name.
 * Tapping a card toggles it open to reveal the stamp grid.
 * Only one card can be open at a time (accordion behaviour).
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PunchCard from "../components/PunchCard";

// ---------------------------------------------------------------------------
// Types & mock data
// ---------------------------------------------------------------------------

interface CardData {
  id: number;
  businessName: string;
  totalStamps: number; // stamps needed to earn a reward
  usedStamps: number;  // stamps the user has collected so far
}

// TODO: replace with a GET /cards API call once the backend supports it.
// Keep mock data at the top of the file so it's easy to find and delete.
const MOCK_CARDS: CardData[] = [
  { id: 1, businessName: "Biz name 1", totalStamps: 9, usedStamps: 6 },
  { id: 2, businessName: "Biz name 2", totalStamps: 9, usedStamps: 2 },
  { id: 3, businessName: "Biz name 3", totalStamps: 9, usedStamps: 1 },
  { id: 4, businessName: "Biz name 4", totalStamps: 9, usedStamps: 3 },
  { id: 5, businessName: "Biz name 5", totalStamps: 9, usedStamps: 0 },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Wallet() {
  const navigate = useNavigate();

  // null means no card is expanded. Storing the ID (not an index) is safer
  // because IDs stay stable if the list is reordered or filtered later.
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Toggle open/closed. Clicking the already-open card collapses it.
  const toggle = (id: number) =>
    setExpandedId(prev => (prev === id ? null : id));

  return (
    <div className="wallet-page-container">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="wallet-header">
        {/* Navigate back instead of using a link so we get browser-history
            behaviour (back button works) without a full page reload. */}
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          ‹
        </button>
        <h1>Punchcard Wallet</h1>
      </div>

      {/* ── Card list ───────────────────────────────────────── */}
      <div className="punchcard-list">
        {MOCK_CARDS.map(card => (
          <div key={card.id} className="punchcard-item" style={{ marginBottom: 15 }}>

            {/* Always-visible footer — acts as the accordion trigger */}
            <div
              className="card-footer"
              onClick={() => toggle(card.id)}
              style={{ cursor: "pointer" }}
            >
              <span>{card.businessName}</span>
              <span className="cool-logo">LOGO</span>
            </div>

            {/* Stamp grid — only rendered when this card is expanded.
                Conditional rendering (not CSS display:none) keeps the DOM
                clean and avoids animating hidden elements. */}
            {expandedId === card.id && (
              <div className="punchcard-details-content" style={{ marginTop: 16 }}>
                <PunchCard
                  businessName=""  // omit name here — the footer above already shows it
                  totalStamps={card.totalStamps}
                  usedStamps={card.usedStamps}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}