import { Link } from "react-router-dom";


export default function Dashboard() {
  return (
    <div>
      {/* TOP FRAME */}
      <div id="top-frame">
        <div className="dropdown location-name">
          <button className="dropbtn">Carnegie Mellon University</button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>

        <div className="search-filter-container">
          <div className="searchbar">
            <span className="search-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input type="text" placeholder="Search bar..." />
          </div>

          <button className="filter-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </button>
        </div>

        <div className="zalando-sans-semiexpanded-welcome-message">
          <h1>Hi Reallycool Name!</h1>
        </div>
      </div>

      {/* PUNCHCARD FRAME */}
      <div id="punchcard-frame">
        <div className="rewards">
          <h1>Your Rewards</h1>

          <Link to="/wallet" className="viewall-link">
            <h1 className="viewall">View All</h1>
          </Link>
        </div>

        <Link to="/wallet" className="punchcard-stack-link">
          <div className="punchcard-stack">
            <div className="punchcard-item stack-card-3">
              <div className="card-footer">
                <span>Biz name 3</span>
                <span className="cool-logo">LOGO</span>
              </div>
            </div>

            <div className="punchcard-item stack-card-2">
              <div className="card-footer">
                <span>Biz name 2</span>
                <span className="cool-logo">LOGO</span>
              </div>
            </div>

            <div className="punchcard-item stack-card-1">
              <div className="stamp-row">
                <div className="stamp checked">✓</div>
                <div className="stamp checked">✓</div>
                <div className="stamp checked">✓</div>
                <div className="stamp checked">✓</div>
                <div className="stamp checked">✓</div>
              </div>

              <div className="stamp-row">
                <div className="stamp checked">✓</div>
                <div className="stamp"></div>
                <div className="stamp"></div>
                <div className="stamp"></div>
                <div className="reward-star">⭐</div>
              </div>

              <div className="card-footer">
                <span>Biz name 1</span>
                <span className="cool-logo">LOGO</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* CATEGORY SECTION */}
      <div className="category-section">
        <div className="category">
          <h1>Category</h1>
        </div>

        <div className="scroll-container">
          <div className="category-card">
            <div className="card-image-placeholder"></div>
            <div className="card-content">
              <p className="name">Business Name</p>
              <p className="rating">⭐ 5.0 rating</p>
            </div>
          </div>

          <div className="category-card">
            <div className="card-image-placeholder"></div>
            <div className="card-content">
              <p className="name">Another Shop</p>
              <p className="rating">⭐ 4.8 rating</p>
            </div>
          </div>

          <div className="category-card">
            <div className="card-image-placeholder"></div>
            <div className="card-content">
              <p className="name">Local Cafe</p>
              <p className="rating">⭐ 4.9 rating</p>
            </div>
          </div>

          <div className="category-card">
            <div className="card-image-placeholder"></div>
            <div className="card-content">
              <p className="name">Bookstore</p>
              <p className="rating">⭐ 5.0 rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
