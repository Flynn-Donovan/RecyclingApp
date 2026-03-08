import { useState, useEffect } from "react";
import "./CollectionPage.css";
import { api } from "../services/api";

export default function CollectionPage({ onBack }) {
  const [items, setItems] = useState([]);
  const [totalRefund, setTotalRefund] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("bottle");
  const [volumeL, setVolumeL] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [weightLb, setWeightLb] = useState("");

  const fetchCollection = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getCollection();
      setItems(data.items || []);
      setTotalRefund(data.totalRefund ?? 0);
    } catch (e) {
      setError(e.message || "Failed to load collection");
      setItems([]);
      setTotalRefund(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "bottle") {
        const vol = Number(volumeL);
        const qty = Math.max(1, parseInt(quantity, 10) || 1);
        if (!vol || vol <= 0) {
          setError("Enter a valid volume (L)");
          return;
        }
        await api.addToCollection({ type: "bottle", volumeL: vol, quantity: qty });
        setVolumeL("");
        setQuantity("1");
      } else {
        const w = Number(weightLb);
        if (!w || w <= 0) {
          setError("Enter a valid weight (lb)");
          return;
        }
        await api.addToCollection({ type: "bag", weightLb: w });
        setWeightLb("");
      }
      await fetchCollection();
    } catch (e) {
      setError(e.message || "Failed to add");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await api.deleteCollectionItem(id);
      await fetchCollection();
    } catch (e) {
      setError(e.message || "Failed to delete");
    }
  };

  const handleClear = async () => {
    if (!window.confirm("Clear entire collection? This cannot be undone.")) return;
    setError("");
    try {
      await api.clearCollection();
      await fetchCollection();
    } catch (e) {
      setError(e.message || "Failed to clear");
    }
  };

  return (
    <div className="collection-page">
      <button className="collection-page__back" onClick={onBack}>
        ← Back
      </button>

      <h2 className="collection-page__heading">My Collection</h2>
      <p className="collection-page__subheading">
        Add bottle entries (volume + quantity) or bag entries (weight). Total refund is calculated automatically.
      </p>

      <div className="collection-page__toggle">
        <button
          className={mode === "bottle" ? "toggle toggle--active" : "toggle"}
          onClick={() => setMode("bottle")}
        >
          Add Bottles
        </button>
        <button
          className={mode === "bag" ? "toggle toggle--active" : "toggle"}
          onClick={() => setMode("bag")}
        >
          Add Bag
        </button>
      </div>

      <form className="collection-form" onSubmit={handleAdd}>
        {mode === "bottle" ? (
          <>
            <label className="collection-form__label">Volume per bottle (L)</label>
            <input
              className="collection-form__input"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 0.5 or 2"
              value={volumeL}
              onChange={(e) => setVolumeL(e.target.value)}
            />
            <label className="collection-form__label">Quantity</label>
            <input
              className="collection-form__input"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </>
        ) : (
          <>
            <label className="collection-form__label">Bag weight (lb)</label>
            <input
              className="collection-form__input"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 11"
              value={weightLb}
              onChange={(e) => setWeightLb(e.target.value)}
            />
          </>
        )}
        <button type="submit" className="collection-form__submit">
          Add to collection
        </button>
      </form>

      {error && <p className="collection-page__error">{error}</p>}

      <div className="collection-total">
        <span className="collection-total__label">Total estimated refund</span>
        <span className="collection-total__value">${totalRefund.toFixed(2)}</span>
      </div>

      {items.length > 0 && (
        <button type="button" className="collection-page__clear" onClick={handleClear}>
          Clear entire collection
        </button>
      )}

      {loading ? (
        <p className="collection-page__loading">Loading…</p>
      ) : items.length === 0 ? (
        <p className="collection-page__empty">No items yet. Add bottles or bags above.</p>
      ) : (
        <ul className="collection-list">
          {items.map((item) => (
            <li key={item._id} className="collection-list__item">
              <span className="collection-list__text">
                {item.type === "bottle"
                  ? `${item.quantity} × ${item.volumeL} L bottle(s)`
                  : `Bag ${item.weightLb} lb`}
                {" — "}
                <strong>${(item.refundAmount || 0).toFixed(2)}</strong>
              </span>
              <button
                type="button"
                className="collection-list__delete"
                onClick={() => handleDelete(item._id)}
                aria-label="Remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
