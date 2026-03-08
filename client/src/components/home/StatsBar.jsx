import "./StatsBar.css";

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-bar__item">
        <div className="stats-bar__value">2.1M+</div>
        <div className="stats-bar__label">Bottles Recycled</div>
      </div>
      <div className="stats-bar__item">
        <div className="stats-bar__value">$380K+</div>
        <div className="stats-bar__label">Refunds Paid</div>
      </div>
      <div className="stats-bar__item">
        <div className="stats-bar__value">500K L</div>
        <div className="stats-bar__label">Water Saved</div>
      </div>
    </div>
  );
}