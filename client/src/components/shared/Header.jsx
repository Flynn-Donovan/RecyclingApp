export default function Header() {
  return (
    <div style={styles.header}>
      <div style={styles.brand}>♻ RecyclingApp</div>
      <div style={styles.region}>Edmonton, AB</div>
    </div>
  );
}

const styles = {
  header: {
    background: "#f5f6f4",
    color: "#1d2c22",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    fontWeight: "600",
  },
  brand: {
    fontSize: "18px",
  },
  region: {
    fontSize: "14px",
    color: "#6a786f",
  },
};