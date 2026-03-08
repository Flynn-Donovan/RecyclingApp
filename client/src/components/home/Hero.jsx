export default function Hero() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.iconCircle}>♻</div>
      <h1 style={styles.title}>RecyclingApp</h1>
      <p style={styles.subtitle}>
        Estimate your bottle refund, find depots, and request pickups — all in Edmonton.
      </p>
    </div>
  );
}

const styles = {
  wrapper: {
    textAlign: "center",
    color: "white",
    padding: "24px 8px 12px",
  },
  iconCircle: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    margin: "0 auto 20px",
    background: "rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
  },
  title: {
    fontSize: "40px",
    margin: "0 0 12px",
    fontWeight: "800",
  },
  subtitle: {
    margin: 0,
    fontSize: "18px",
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.9)",
  },
};