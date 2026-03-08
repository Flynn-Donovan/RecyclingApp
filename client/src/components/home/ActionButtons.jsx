import "./ActionButtons.css";

export default function ActionButtons({ onEstimate, onCollection, onDepots, onPickup }) {
  return (
    <div className="action-buttons">
      <button className="action-buttons__primary" onClick={onEstimate}>
        🧮 Quick Estimate
      </button>

      <button className="action-buttons__secondary" onClick={onCollection}>
        📦 My Collection
      </button>

      <button className="action-buttons__secondary" onClick={onDepots}>
        📍 Nearby Depots
      </button>

      <button className="action-buttons__secondary" onClick={onPickup}>
        🚚 Request Pickup
      </button>
    </div>
  );
}