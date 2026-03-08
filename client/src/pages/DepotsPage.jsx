import { useState, useEffect } from "react";
import "./DepotsPage.css";
import { api } from "../services/api";

function mapsDirectionsUrl(address) {
  const encoded = encodeURIComponent(address);
  return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
}

export default function DepotsPage({ onBack }) {
  const [depots, setDepots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .getDepots()
      .then((data) => {
        if (!cancelled) setDepots(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || "Failed to load depots");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="depots-page">
      <button className="depots-page__back" onClick={onBack}>
        ← Back
      </button>

      <h2 className="depots-page__heading">Nearby Depots</h2>
      <p className="depots-page__subheading">
        Bottle depots in Edmonton. Open in Google Maps for directions.
      </p>

      {error && <p className="depots-page__error">{error}</p>}
      {loading && <p className="depots-page__loading">Loading depots…</p>}

      <div className="depots-page__list">
        {depots.map((depot) => (
          <div key={depot.id || depot._id} className="depot-card">
            <h3 className="depot-card__name">{depot.name}</h3>
            <p className="depot-card__text">{depot.address}</p>
            {depot.hours && <p className="depot-card__text">{depot.hours}</p>}
            {depot.note && <p className="depot-card__note">{depot.note}</p>}
            <a
              className="depot-card__directions"
              href={mapsDirectionsUrl(depot.address)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
