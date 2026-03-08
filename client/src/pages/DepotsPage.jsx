import { depots } from "../data/depots";

export default function DepotsPage({ onBack }) {
  return (
    <div>
      <button style={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <h2 style={styles.heading}>Nearby Depots</h2>
      <p style={styles.subheading}>Sample Edmonton depot locations for the demo.</p>

      <div style={styles.list}>
        {depots.map((depot) => (
          <div key={depot.id} style={styles.card}>
            <h3 style={styles.name}>{depot.name}</h3>
            <p style={styles.text}>{depot.address}</p>
            <p style={styles.text}>{depot.hours}</p>
            <p style={styles.note}>{depot.note}</p>
          </div>
        ))}
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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  card: {
    background: "#f7f7f4",
    borderRadius: "20px",
    padding: "18px",
  },
  name: {
    margin: "0 0 8px",
    color: "#1e2a22",
  },
  text: {
    margin: "0 0 6px",
    color: "#52635a",
  },
  note: {
    marginTop: "10px",
    color: "#2e9660",
    fontWeight: "600",
  },
};