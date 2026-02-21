/**
 * SearchBar — the search input + filter button row.
 *
 * Extracted from Dashboard so it can be dropped into any page that needs
 * search (e.g. a dedicated Explore page) without duplicating markup.
 *
 * Currently stateless (no filtering logic). When you're ready to wire it up:
 *   1. Add an `onSearch` prop: (query: string) => void
 *   2. Add an `onFilter` prop: () => void  (to open a filter sheet)
 *   3. Drive the input with useState and call props on change/click.
 */

export default function SearchBar() {
  return (
    <div className="search-filter-container">
      {/* The icon + input share a single rounded container so they look
          like one unified search field. */}
      <div className="searchbar">
        <span className="search-icon">
          <MagnifyingGlassIcon />
        </span>
        <input type="text" placeholder="Search bar..." />
      </div>

      {/* Separate filter button that will open a filter/sort sheet.
          aria-label is required for screen readers since there's no text. */}
      <button className="filter-btn" aria-label="Filter results">
        <FilterIcon />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Icons
//
// Inline SVGs rather than an icon library because:
//  - No extra dependency to install or update.
//  - These two icons are the only ones needed in this component.
//  - They're small enough that bundle size impact is negligible.
// ---------------------------------------------------------------------------

function MagnifyingGlassIcon() {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#888" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      {/* The diagonal line forms the "handle" of the magnifying glass */}
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FilterIcon() {
  // Three vertical sliders — a common "filter / equaliser" metaphor.
  // Each slider is a vertical line with a horizontal crossbar at different heights.
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
    >
      {/* Left slider — crossbar near the bottom */}
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      {/* Middle slider — crossbar in the middle */}
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      {/* Right slider — crossbar near the top */}
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      {/* Horizontal crossbars */}
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}