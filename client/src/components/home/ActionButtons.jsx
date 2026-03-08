import "./ActionButtons.css";

function QuickEstimateIcon() {
  return (
    <span className="cta__icon cta__icon--primary" aria-hidden>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M7 6h10M7 10h10M7 14h4M17 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </span>
  );
}

export default function ActionButtons({ onEstimate, onCollection, onDepots, onPickup }) {
  return (
    <section className="ctas">
      <div className="ctas__grid">
        <button type="button" className="cta cta--primary" onClick={onEstimate}>
          <QuickEstimateIcon />
          <span className="cta__label">Quick Estimate</span>
        </button>
        <button type="button" className="cta cta--secondary" onClick={onCollection}>
          <span className="cta__icon cta__icon--secondary" aria-hidden>📦</span>
          <span className="cta__label">My Collection</span>
        </button>
        <button type="button" className="cta cta--secondary" onClick={onDepots}>
          <span className="cta__icon cta__icon--secondary" aria-hidden>📍</span>
          <span className="cta__label">Nearby Depots</span>
        </button>
        <button type="button" className="cta cta--secondary" onClick={onPickup}>
          <span className="cta__icon cta__icon--secondary" aria-hidden>🚚</span>
          <span className="cta__label">Request Pickup</span>
        </button>
      </div>
    </section>
  );
}
