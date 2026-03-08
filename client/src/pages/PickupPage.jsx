import "./PickupPage.css";
import { pickupServices } from "../data/pickupServices";

export default function PickupPage({ onBack }) {
  return (
    <div className="pickup-page">
      <button className="pickup-page__back" onClick={onBack}>
        ← Back
      </button>

      <h2 className="pickup-page__heading">Request Pickup Service</h2>
      <p className="pickup-page__subheading">
        Mock pickup services available for Edmonton demo.
      </p>

      <div className="pickup-page__list">
        {pickupServices.map((service) => (
          <div key={service.id} className="pickup-card">
            <h3 className="pickup-card__name">{service.name}</h3>
            <p className="pickup-card__text">{service.area}</p>
            <p className="pickup-card__text">{service.description}</p>
            <button className="pickup-card__button">Request Service</button>
          </div>
        ))}
      </div>

      <div className="pickup-form">
        <h3 className="pickup-form__title">Quick Pickup Request</h3>
        <input className="pickup-form__input" placeholder="Your name" />
        <input className="pickup-form__input" placeholder="Pickup address" />
        <input className="pickup-form__input" placeholder="Estimated bag count" />
        <button className="pickup-form__submit">Submit Request</button>
      </div>
    </div>
  );
}