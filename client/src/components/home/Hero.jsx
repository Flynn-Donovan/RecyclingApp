import "./Hero.css";
import Logo from "../shared/Logo";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden />
      <div className="hero__content">
        <Logo size={56} showText={true} variant="light" />
        <p className="hero__slogan">Turn your empties into earnings.</p>
        <p className="hero__description">
          Estimate bottle refunds, track your collection, find nearby depots, and request pickup — all in one friendly app.
        </p>
        <div className="hero__illustration" aria-hidden>
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="110" rx="90" ry="12" fill="rgba(255,255,255,0.1)" />
            <rect x="62" y="35" width="24" height="55" rx="5" fill="rgba(255,255,255,0.4)" />
            <rect x="66" y="28" width="16" height="10" rx="3" fill="rgba(255,255,255,0.5)" />
            <rect x="114" y="40" width="24" height="50" rx="5" fill="rgba(255,255,255,0.35)" />
            <rect x="118" y="33" width="16" height="10" rx="3" fill="rgba(255,255,255,0.45)" />
            <path d="M30 70 Q50 50 70 70 Q90 90 100 75 Q110 60 130 70 Q150 85 170 70" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="165" cy="65" r="14" fill="rgba(250,204,21,0.9)" />
            <text x="165" y="70" textAnchor="middle" fill="#0F766E" fontSize="14" fontWeight="bold" fontFamily="system-ui">$</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
