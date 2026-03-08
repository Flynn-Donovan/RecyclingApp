import "./StatsBar.css";

function RecyclingIcon() {
  return (
    <svg className="stat__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11v6M14 11v6M12 11v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function MoneyIcon() {
  return (
    <svg className="stat__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BottleIcon() {
  return (
    <svg className="stat__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 6v14a2 2 0 002 2h2a2 2 0 002-2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const stats = [
  { value: "2.1M+", label: "Bottles recycled", icon: RecyclingIcon },
  { value: "$380K+", label: "Refunds collected", icon: MoneyIcon },
  { value: "500K L", label: "Liters recycled", icon: BottleIcon },
];

export default function StatsBar() {
  return (
    <section className="stats" aria-label="Impact metrics">
      <div className="stats__inner">
        <div className="stats__grid">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat">
                <span className="stat__icon-wrap" aria-hidden>
                  <Icon />
                </span>
                <div className="stat__value">{s.value}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
