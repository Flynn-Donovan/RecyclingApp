import { useState } from 'react';
import './styles/shared.css';
import './styles/main.css';

function App() {
  const [formData, setFormData] = useState({
    tag: 'bottle',
    region: 'Alberta',
    moreThanLiter: false,
    bottleCount: 1,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'bottleCount'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: '2rem' }}>
      <section className="section" style={{ width: '100%', maxWidth: '420px', gap: '1rem' }}>
        <h1>Recycling Refund Calculator</h1>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <label>
            Tag
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
            />
          </label>

          <label>
            Region
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
          </label>

          <label>
            Bottle count
            <input
              type="number"
              name="bottleCount"
              min="1"
              value={formData.bottleCount}
              onChange={handleChange}
            />
          </label>

          <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="checkbox"
              name="moreThanLiter"
              checked={formData.moreThanLiter}
              onChange={handleChange}
            />
            More than 1 litre
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate refund'}
          </button>
        </form>

        {error && <p style={{ color: 'crimson' }}>{error}</p>}

        {result && (
          <div style={{ padding: '1rem', background: '#fff', borderRadius: '12px' }}>
            <h2>Result</h2>
            <p>Tag: {result.tag}</p>
            <p>Region: {result.region}</p>
            <p>Bottles: {result.bottleCount}</p>
            <p>Refund per bottle: ${result.refundPerBottle.toFixed(2)}</p>
            <p>
              <strong>Total refund: ${result.refundAmount.toFixed(2)}</strong>
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;