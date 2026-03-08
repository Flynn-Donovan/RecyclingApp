import { pickupServices } from "../data/pickupServices";

export default function PickupPage({ onBack }) {
  return (
    <div>
      <button style={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <h2 style={styles.heading}>Request Pickup Service</h2>
      <p style={styles.subheading}>Mock pickup services available for Edmonton demo.</p>

      <div style={styles.list}>
        {pickupServices.map((service) => (
          <div key={service.id} style={styles.card}>
            <h3 style={styles.name}>{service.name}</h3>
            <p style={styles.text}>{service.area}</p>
            <p style={styles.text}>{service.description}</p>
            <button style={styles.cardButton}>Request Service</button>
          </div>
        ))}
      </div>

      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>Quick Pickup Request</h3>
        <input style={styles.input} placeholder="Your name" />
        <input style={styles.input} placeholder="Pickup address" />
        <input style={styles.input} placeholder="Estimated bag count" />
        <button style={styles.submitButton}>Submit Request</button>
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
    marginBottom: "20px",
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
  cardButton: {
    marginTop: "12px",
    background: "#2e9660",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "12px 14px",
    cursor: "pointer",
    fontWeight: "700",
  },
  formCard: {
    background: "#f7f7f4",
    borderRadius: "20px",
    padding: "18px",
  },
  formTitle: {
    marginTop: 0,
    color: "#1e2a22",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d7ddd9",
    marginBottom: "12px",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  submitButton: {
    width: "100%",
    background: "#2e9660",
    color: "white",
    border: "none",
    borderRadius: "14px",
    padding: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
  },
};