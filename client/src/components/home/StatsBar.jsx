export default function StatsBar() {
  return (
    <div style={styles.card}>
      <div style={styles.item}>
        <div style={styles.value}>2.1M+</div>
        <div style={styles.label}>Bottles Recycled</div>
      </div>
      <div style={styles.item}>
        <div style={styles.value}>$380K+</div>
        <div style={styles.label}>Refunds Paid</div>
      </div>
      <div style={styles.item}>
        <div style={styles.value}>500K L</div>
        <div style={styles.label}>Water Saved</div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    marginTop: "28px",
    background: "#f7f7f4",
    borderRadius: "24px",
    padding: "22px 16px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    textAlign: "center",
  },
  item: {},
  value: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#1c2d23",
    marginBottom: "6px",
  },
  label: {
    fontSize: "13px",
    color: "#66756d",
  },
};