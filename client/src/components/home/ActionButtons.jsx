import "./ActionButtons.css";

export default function ActionButtons({ onEstimate, onDepots, onPickup }) {
  return (
    <div className="action-buttons">
      <button className="action-buttons__primary" onClick={onEstimate}>
        🧮 Start Estimating
      </button>

      <button className="action-buttons__secondary" onClick={onDepots}>
        📍 View Nearby Depots
      </button>

      <button className="action-buttons__secondary" onClick={onPickup}>
        🚚 Request Pickup Service
      </button>
    </div>
  );
}