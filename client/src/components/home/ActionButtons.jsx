export default function ActionButtons({ onEstimate, onDepots, onPickup }) {
  return (
    <div style={styles.wrapper}>
      <button style={styles.primaryButton} onClick={onEstimate}>
        🧮 Start Estimating
      </button>

      <button style={styles.secondaryButton} onClick={onDepots}>
        📍 View Nearby Depots
      </button>

      <button style={styles.secondaryButton} onClick={onPickup}>
        🚚 Request Pickup Service
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "28px",
  },
  primaryButton: {
    background: "#ffffff",
    color: "#2e9660",
    border: "none",
    borderRadius: "18px",
    padding: "18px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
  },
  secondaryButton: {
    background: "rgba(255,255,255,0.18)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: "18px",
    padding: "18px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
  },
};