import { useState } from "react";
import { calculateVolumeRefund, calculateWeightRefund } from "./utils/calculateRefund";

export default function App() {
  const [mode, setMode] = useState("volume");
  const [volumeMl, setVolumeMl] = useState("1000");
  const [weightG, setWeightG] = useState("3");
  const [refund, setRefund] = useState(null);

  const handleEstimate = () => {
    if (mode === "volume") {
      const result = calculateVolumeRefund(volumeMl);
      setRefund(result);
    } else {
      const result = calculateWeightRefund(weightG);
      setRefund(result);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.phoneCard}>
        <h1 style={styles.title}>RecyclingApp</h1>
        <p style={styles.subtitle}>Edmonton refund estimator</p>

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

        {mode === "volume" && (
          <div style={styles.section}>
            <label style={styles.label}>Select bottle volume</label>
            <select
              value={volumeMl}
              onChange={(e) => setVolumeMl(e.target.value)}
              style={styles.select}
            >
              <option value="1000">1 L</option>
              <option value="2000">2 L</option>
              <option value="4000">4 L</option>
            </select>
          </div>
        )}

        {mode === "weight" && (
          <div style={styles.section}>
            <label style={styles.label}>Select bottle weight</label>
            <select
              value={weightG}
              onChange={(e) => setWeightG(e.target.value)}
              style={styles.select}
            >
              <option value="3">3 g</option>
              <option value="6">6 g</option>
            </select>
          </div>
        )}

        <button style={styles.estimateBtn} onClick={handleEstimate}>
          Estimate Refund
        </button>

        {refund !== null && (
          <div style={styles.resultCard}>
            <p style={styles.resultLabel}>Estimated Refund</p>
            <h2 style={styles.resultValue}>${refund.toFixed(2)}</h2>
            <p style={styles.resultNote}>Based on Edmonton prototype rules</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef7f0",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  phoneCard: {
    width: "100%",
    maxWidth: "390px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    color: "#1f5f3b",
    textAlign: "center",
  },
  subtitle: {
    marginTop: "8px",
    marginBottom: "24px",
    color: "#4b6354",
    textAlign: "center",
    fontSize: "14px",
  },
  toggleRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  toggle: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #b7d6bf",
    background: "#f7fbf8",
    cursor: "pointer",
    fontWeight: "600",
  },
  activeToggle: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #2f7d4d",
    background: "#dff3e5",
    cursor: "pointer",
    fontWeight: "700",
    color: "#1f5f3b",
  },
  section: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#2a3a2f",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #c8d8cc",
    fontSize: "16px",
    background: "#fff",
  },
  estimateBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "#2f7d4d",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
  resultCard: {
    marginTop: "20px",
    background: "#f3fbf5",
    border: "1px solid #d6eadb",
    borderRadius: "18px",
    padding: "18px",
    textAlign: "center",
  },
  resultLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#4b6354",
  },
  resultValue: {
    margin: "10px 0 6px 0",
    fontSize: "32px",
    color: "#1f5f3b",
  },
  resultNote: {
    margin: 0,
    fontSize: "13px",
    color: "#6c7f72",
  },
};