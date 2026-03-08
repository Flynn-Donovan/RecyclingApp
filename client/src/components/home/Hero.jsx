import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__icon-circle">♻</div>
      <h1 className="hero__title">RecyclingApp</h1>
      <p className="hero__subtitle">
        Estimate your bottle refund, find depots, and request pickups — all in Edmonton.
      </p>
    </div>
  );
}