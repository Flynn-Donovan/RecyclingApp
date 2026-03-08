import { useState } from "react";
import "./PickupPage.css";
import { api } from "../services/api";

export default function PickupPage({ onBack }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [estimatedBagCount, setEstimatedBagCount] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const bagCount = parseInt(estimatedBagCount, 10);
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!address.trim()) {
      setError("Address is required");
      return;
    }
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }
    if (!Number.isInteger(bagCount) || bagCount < 1) {
      setError("Estimated bag count must be at least 1");
      return;
    }

    setLoading(true);
    try {
      await api.postPickup({
        name: name.trim(),
        address: address.trim(),
        phone: phone.trim(),
        estimatedBagCount: bagCount,
        notes: notes.trim(),
      });
      setSuccess(true);
      setName("");
      setAddress("");
      setPhone("");
      setEstimatedBagCount("");
      setNotes("");
    } catch (e) {
      setError(e.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pickup-page">
      <button className="pickup-page__back" onClick={onBack}>
        ← Back
      </button>

      <h2 className="pickup-page__heading">Request Pickup Service</h2>
      <p className="pickup-page__subheading">
        Submit your details and we’ll pass your request to a pickup service in Edmonton.
      </p>

      <form className="pickup-form" onSubmit={handleSubmit}>
        <h3 className="pickup-form__title">Pickup Request</h3>

        <label className="pickup-form__label">Name</label>
        <input
          className="pickup-form__input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="pickup-form__label">Address</label>
        <input
          className="pickup-form__input"
          placeholder="Pickup address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label className="pickup-form__label">Phone number</label>
        <input
          className="pickup-form__input"
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="pickup-form__label">Estimated bag count</label>
        <input
          className="pickup-form__input"
          type="number"
          min="1"
          placeholder="e.g. 3"
          value={estimatedBagCount}
          onChange={(e) => setEstimatedBagCount(e.target.value)}
        />

        <label className="pickup-form__label">Notes (optional)</label>
        <input
          className="pickup-form__input"
          placeholder="Any special instructions"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {error && <p className="pickup-form__error">{error}</p>}
        {success && <p className="pickup-form__success">Request submitted. A service may contact you soon.</p>}

        <button type="submit" className="pickup-form__submit" disabled={loading}>
          {loading ? "Submitting…" : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
