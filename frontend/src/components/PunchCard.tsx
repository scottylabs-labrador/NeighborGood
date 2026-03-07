/**
 * PunchCard — reusable punch card UI.
 *
 * Previously the stamp HTML was copy-pasted into Dashboard and wallet.html.
 * Now there's one source of truth.
 *
 * Usage:
 *   <PunchCard businessName="Local Cafe" totalStamps={10} usedStamps={6} />
 */

interface Props {
  businessName: string;
  totalStamps: number;  // total stamps needed to earn the reward (e.g. 9)
  usedStamps: number;   // how many the user has earned so far
  className?: string;   // optional extra CSS class for layout overrides
}

export default function PunchCard({ businessName, totalStamps, usedStamps, className }: Props) {
  // Build a flat array of booleans: true = filled stamp, false = empty slot.
  // e.g. totalStamps=9, usedStamps=6 → [T,T,T,T,T,T,F,F,F]
  const stamps = Array.from({ length: totalStamps }, (_, i) => i < usedStamps);

  // Split into rows of 5 so the card layout stays consistent regardless of
  // how many total stamps the business has configured.
  const rows: boolean[][] = [];
  for (let i = 0; i < stamps.length; i += 5) {
    rows.push(stamps.slice(i, i + 5));
  }

  return (
    <div className={`punchcard-item ${className ?? ""}`}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="stamp-row">
          {row.map((filled, colIdx) => (
            <div key={colIdx} className={`stamp ${filled ? "checked" : ""}`}>
              {filled ? "✓" : ""}
            </div>
          ))}

          {/*
            The reward star goes on the last cell of the last row only.
            It visually shows "earn a reward when you reach here."
          */}
          {rowIdx === rows.length - 1 && (
            <div className="reward-star">⭐</div>
          )}
        </div>
      ))}

      <div className="card-footer">
        <span>{businessName}</span>
        {/* Placeholder until real logos are stored/served from the backend */}
        <span className="cool-logo">LOGO</span>
      </div>
    </div>
  );
}