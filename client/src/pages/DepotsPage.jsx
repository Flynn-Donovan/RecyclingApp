import "./DepotsPage.css";
import { depots } from "../data/depots";

export default function DepotsPage({ onBack }) {
  return (
    <div className="depots-page">
      <button className="depots-page__back" onClick={onBack}>
        ← Back
      </button>

      <h2 className="depots-page__heading">Nearby Depots</h2>
      <p className="depots-page__subheading">
        Sample Edmonton depot locations for the demo.
      </p>

      <div className="depots-page__list">
        {depots.map((depot) => (
          <div key={depot.id} className="depot-card">
            <h3 className="depot-card__name">{depot.name}</h3>
            <p className="depot-card__text">{depot.address}</p>
            <p className="depot-card__text">{depot.hours}</p>
            <p className="depot-card__note">{depot.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}