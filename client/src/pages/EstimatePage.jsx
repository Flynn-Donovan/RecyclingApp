import { useState } from "react";
import { calculateVolumeRefund, calculateWeightRefund } from "../utils/calculateRefund";

export default function EstimatePage({ onBack }) {
  const [mode, setMode] = useState("volume");
  const [volumeMl, setVolumeMl] = useState("1000");
  const [weightG, setWeightG] = useState("3");
  const [refund, setRefund] = useState(null);

  const handleEstimate = () => {
    if (mode === "volume") {
      setRefund(calculateVolumeRefund(volumeMl));
    } else {
      setRefund(calculateWeightRefund(weightG));
    }
  };

  return (
    <div>
      <button style={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <h2 style={styles.heading}>Estimate Your Refund</h2>
      <p style={styles.subheading}>Choose volume or bag weight to estimate your refund.</p>

      <div style={styles.toggleRow}>
        <button
          style={mode === "volume" ? styles.activeToggle : styles.toggle}
          onClick={() => {
            setMode("volume");
            setRefund(null);
          }}
        >
          By Volume
        </button>
        <button
          style={mode === "weight" ? styles.activeToggle : styles.toggle}
          onClick={() => {
            setMode("weight");
            setRefund(null);
          }}
        >
          By Weight
        </button>
      </div>

      <div style={styles.card}>
        {mode === "volume" ? (
          <>
            <label style={styles.label}>Bottle Volume</label>
            <select
              value={volumeMl}
              onChange={(e) => setVolumeMl(e.target.value)}
              style={styles.input}
            >
              <option value="355">355 mL</option>
              <option value="500">500 mL</option>
              <option value="1000">1 L</option>
              <option value="2000">2 L</option>
              <option value="4000">4 L</option>
            </select>
          </>
        ) : (
          <>
            <label style={styles.label}>Bag Weight</label>
            <select
              value={weightG}
              onChange={(e) => setWeightG(e.target.value)}
              style={styles.input}
            >
              <option value="3">3 g</option>
              <option value="6">6 g</option>
              <option value="9">9 g</option>
              <option value="12">12 g</option>
            </select>
          </>
        )}

        <button style={styles.estimateButton} onClick={handleEstimate}>
          Estimate Refund
        </button>

        {refund !== null && (
          <div style={styles.resultBox}>
            <div style={styles.resultLabel}>Estimated Refund</div>
            <div style={styles.resultValue}>${refund.toFixed(2)}</div>
            <div style={styles.resultNote}>Based on Edmonton prototype rules</div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  backButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "16px",
    marginBottom: "16px",
    cursor: "pointer",
    padding: 0,
  },
  heading: {
    fontSize: "32px",
    color: "white",
    margin: "0 0 8px",
  },
  subheading: {
    color: "rgba(255,255,255,0.9)",
    marginBottom: "20px",
    fontSize: "16px",
  },
  toggleRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "18px",
  },
  toggle: {
    flex: 1,
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
  activeToggle: {
    flex: 1,
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: "#ffffff",
    color: "#2e9660",
    cursor: "pointer",
    fontWeight: "700",
  },
  card: {
    background: "#f7f7f4",
    borderRadius: "22px",
    padding: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#304237",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #d5ddd8",
    fontSize: "16px",
    marginBottom: "16px",
  },
  estimateButton: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    background: "#2e9660",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "18px",
    background: "#eaf6ee",
    borderRadius: "18px",
    padding: "18px",
    textAlign: "center",
  },
  resultLabel: {
    color: "#567060",
    fontSize: "14px",
  },
  resultValue: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#1f2d24",
    margin: "8px 0",
  },
  resultNote: {
    fontSize: "13px",
    color: "#6f7f76",
  },
};