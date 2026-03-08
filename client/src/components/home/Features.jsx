import "./Features.css";

const features = [
  {
    icon: "🧮",
    title: "Estimate refunds instantly",
    description: "Enter volume or weight and get your refund estimate in seconds. No guesswork.",
  },
  {
    icon: "📦",
    title: "Track your bottles",
    description: "Build your collection and see your total refund add up as you go.",
  },
  {
    icon: "📍",
    title: "Find depots nearby",
    description: "See bottle depots in Edmonton with addresses and open hours.",
  },
  {
    icon: "🚚",
    title: "Schedule pickup services",
    description: "Request a pickup and get your bottles collected from your door.",
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="features__inner">
        <h2 className="features__heading">What you can do</h2>
        <div className="features__grid">
          {features.map((f) => (
            <article key={f.title} className="feature-card">
              <span className="feature-card__icon" aria-hidden>{f.icon}</span>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
