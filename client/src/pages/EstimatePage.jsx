import { useState } from "react";
import "./EstimatePage.css";
import { calculateVolumeRefund, calculateWeightRefund } from "../utils/calculateRefund";

export default function EstimatePage({ onBack }) {
  const [mode, setMode] = useState("volume");
  const [volumeL, setVolumeL] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [refund, setRefund] = useState(null);

  const handleEstimate = () => {
    if (mode === "volume") {
      setRefund(calculateVolumeRefund(volumeL));
    } else {
      setRefund(calculateWeightRefund(weightLb));
    }
  };

  return (
    <div className="estimate-page">
      <button className="estimate-page__back" onClick={onBack}>
        ← Back
      </button>

      <h2 className="estimate-page__heading">Estimate Your Refund</h2>
      <p className="estimate-page__subheading">
        Enter bottle volume or total bag weight to estimate your refund.
      </p>

      <div className="estimate-page__toggle-row">
        <button
          className={mode === "volume" ? "toggle toggle--active" : "toggle"}
          onClick={() => {
            setMode("volume");
            setRefund(null);
          }}
        >
          By Volume
        </button>

        <button
          className={mode === "weight" ? "toggle toggle--active" : "toggle"}
          onClick={() => {
            setMode("weight");
            setRefund(null);
          }}
        >
          By Weight
        </button>
      </div>

      <div className="estimate-card">
        {mode === "volume" ? (
          <>
            <label className="estimate-card__label">Bottle Volume (Litres)</label>
            <input
              className="estimate-card__input"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 0.5 or 2"
              value={volumeL}
              onChange={(e) => setVolumeL(e.target.value)}
            />
            <p className="estimate-card__helper">
              1 L or less = $0.10, over 1 L = $0.25
            </p>
          </>
        ) : (
          <>
            <label className="estimate-card__label">Bag Weight (lb)</label>
            <input
              className="estimate-card__input"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 11"
              value={weightLb}
              onChange={(e) => setWeightLb(e.target.value)}
            />
            <p className="estimate-card__helper">11 lb = $1.00 refund estimate</p>
          </>
        )}

        <button className="estimate-card__button" onClick={handleEstimate}>
          Estimate Refund
        </button>

        {refund !== null && (
          <div className="estimate-card__result-box">
            <div className="estimate-card__result-label">Estimated Refund</div>
            <div className="estimate-card__result-value">${refund.toFixed(2)}</div>
            <div className="estimate-card__result-note">
              Based on Edmonton prototype rules
            </div>
          </div>
        )}
      </div>
    </div>
  );
}