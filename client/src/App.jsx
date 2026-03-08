<<<<<<< HEAD
import { useState } from "react";
import "./styles/app.css";

import Header from "./components/shared/Header";
import Hero from "./components/home/Hero";
import ActionButtons from "./components/home/ActionButtons";
import StatsBar from "./components/home/StatsBar";

import EstimatePage from "./pages/EstimatePage";
import DepotsPage from "./pages/DepotsPage";
import PickupPage from "./pages/PickupPage";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "estimate":
        return <EstimatePage onBack={() => setPage("home")} />;
      case "depots":
        return <DepotsPage onBack={() => setPage("home")} />;
      case "pickup":
        return <PickupPage onBack={() => setPage("home")} />;
      default:
        return (
          <>
            <Hero />
            <ActionButtons
              onEstimate={() => setPage("estimate")}
              onDepots={() => setPage("depots")}
              onPickup={() => setPage("pickup")}
            />
            <StatsBar />
          </>
        );
    }
  };

  return (
    <div className="page">
      <div className="app-shell">
        <Header />
        <div className="app-content">{renderPage()}</div>
      </div>
    </div>
  );
}
=======
import { useEffect, useMemo, useState } from 'react';
import './styles/shared.css';
import './styles/main.css';

const STORAGE_KEY = 'recyclingapp-goals';

const refundRules = [
  { tag: 'bottle', region: 'Alberta', moreThanLiter: false, refund: 0.1 },
  { tag: 'bottle', region: 'Alberta', moreThanLiter: true, refund: 0.25 },
];

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

const loadGoalsFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

function App() {
  const [formData, setFormData] = useState({
    tag: 'bottle',
    region: 'Alberta',
    moreThanLiter: false,
    bottleCount: 1,
  });

  const [goals, setGoals] = useState(loadGoalsFromStorage);
  const [goalTitle, setGoalTitle] = useState('');
  const [bagName, setBagName] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [selectedBagId, setSelectedBagId] = useState('');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    if (!goals.length) {
      setSelectedGoalId('');
      setSelectedBagId('');
      return;
    }

    const selectedGoalStillExists = goals.some((goal) => goal._id === selectedGoalId);
    const goalToUse = selectedGoalStillExists
      ? goals.find((goal) => goal._id === selectedGoalId)
      : goals[0];

    if (goalToUse && goalToUse._id !== selectedGoalId) {
      setSelectedGoalId(goalToUse._id);
    }

    const selectedBagStillExists = goalToUse?.bags?.some((bag) => bag._id === selectedBagId);
    const bagToUse = selectedBagStillExists ? selectedBagId : goalToUse?.bags?.[0]?._id || '';

    if (bagToUse !== selectedBagId) {
      setSelectedBagId(bagToUse);
    }
  }, [goals, selectedGoalId, selectedBagId]);

  const selectedGoal = useMemo(
    () => goals.find((goal) => goal._id === selectedGoalId) || null,
    [goals, selectedGoalId]
  );

  const selectedBag = useMemo(
    () => selectedGoal?.bags?.find((bag) => bag._id === selectedBagId) || null,
    [selectedGoal, selectedBagId]
  );

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

  const calculateRefundValue = ({ tag, region, moreThanLiter, bottleCount }) => {
    if (!tag.trim()) {
      throw new Error('Tag missing');
    }

    if (!region.trim()) {
      throw new Error('Region missing');
    }

    if (typeof moreThanLiter !== 'boolean') {
      throw new Error('moreThanLiter must be true or false');
    }

    if (!Number.isInteger(bottleCount) || bottleCount <= 0) {
      throw new Error('bottleCount must be a positive integer');
    }

    const rule = refundRules.find(
      (item) =>
        item.tag.toLowerCase() === tag.trim().toLowerCase() &&
        item.region.toLowerCase() === region.trim().toLowerCase() &&
        item.moreThanLiter === moreThanLiter
    );

    if (!rule) {
      throw new Error('No matching refund rule found');
    }

    return {
      _id: createId(),
      tag: tag.trim(),
      region: region.trim(),
      moreThanLiter,
      bottleCount,
      refundPerBottle: rule.refund,
      refundAmount: rule.refund * bottleCount,
      createdAt: new Date().toISOString(),
    };
  };

  const createGoal = (event) => {
    event.preventDefault();
    setError('');

    const trimmedTitle = goalTitle.trim();

    if (!trimmedTitle) {
      setError('Goal title is required');
      return;
    }

    const newGoal = {
      _id: createId(),
      title: trimmedTitle,
      bags: [],
    };

    setGoals((prev) => [...prev, newGoal]);
    setGoalTitle('');
    setSelectedGoalId(newGoal._id);
    setSelectedBagId('');
  };

  const createBag = (event) => {
    event.preventDefault();
    setError('');

    if (!selectedGoalId) {
      setError('Select a goal first');
      return;
    }

    const trimmedBagName = bagName.trim();

    if (!trimmedBagName) {
      setError('Bag name is required');
      return;
    }

    const newBag = {
      _id: createId(),
      name: trimmedBagName,
      bottleCollections: [],
    };

    setGoals((prev) =>
      prev.map((goal) =>
        goal._id === selectedGoalId
          ? { ...goal, bags: [...goal.bags, newBag] }
          : goal
      )
    );

    setBagName('');
    setSelectedBagId(newBag._id);
  };

  const calculateRefund = (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const calculatedResult = calculateRefundValue(formData);
      setResult(calculatedResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveCollection = () => {
    setLoading(true);
    setError('');
    setResult(null);

    if (!selectedGoalId || !selectedBagId) {
      setLoading(false);
      setError('Select a goal and bag before saving');
      return;
    }

    try {
      const newCollection = calculateRefundValue(formData);

      setGoals((prev) =>
        prev.map((goal) =>
          goal._id !== selectedGoalId
            ? goal
            : {
                ...goal,
                bags: goal.bags.map((bag) =>
                  bag._id !== selectedBagId
                    ? bag
                    : {
                        ...bag,
                        bottleCollections: [...bag.bottleCollections, newCollection],
                      }
                ),
              }
        )
      );

      setResult(newCollection);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAllData = () => {
    const confirmed = window.confirm('Delete all saved goals, bags, and bottle collections?');

    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);
    setGoals([]);
    setSelectedGoalId('');
    setSelectedBagId('');
    setResult(null);
    setError('');
  };

  return (
    <main className="container" style={{ padding: '2rem' }}>
      <section className="section" style={{ width: '100%', maxWidth: '720px', gap: '1rem' }}>
        <h1>Recycling Refund Calculator</h1>

        <div
          style={{
            padding: '1rem',
            background: '#fff',
            borderRadius: '12px',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <h2>1. Goal</h2>

          <form onSubmit={createGoal} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Goal title (example: Trip fund)"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              style={{ flex: 1, minWidth: '220px' }}
            />
            <button type="submit">Create goal</button>
          </form>

          <label>
            Select goal
            <select
              value={selectedGoalId}
              onChange={(e) => {
                const goalId = e.target.value;
                setSelectedGoalId(goalId);

                const goal = goals.find((item) => item._id === goalId);
                setSelectedBagId(goal?.bags?.[0]?._id || '');
              }}
            >
              <option value="">Choose a goal</option>
              {goals.map((goal) => (
                <option key={goal._id} value={goal._id}>
                  {goal.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          style={{
            padding: '1rem',
            background: '#fff',
            borderRadius: '12px',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <h2>2. Bag</h2>

          <form onSubmit={createBag} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Bag name (example: Garage bag)"
              value={bagName}
              onChange={(e) => setBagName(e.target.value)}
              style={{ flex: 1, minWidth: '220px' }}
            />
            <button type="submit">Add bag</button>
          </form>

          <label>
            Select bag
            <select
              value={selectedBagId}
              onChange={(e) => setSelectedBagId(e.target.value)}
              disabled={!selectedGoal}
            >
              <option value="">Choose a bag</option>
              {selectedGoal?.bags?.map((bag) => (
                <option key={bag._id} value={bag._id}>
                  {bag.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          style={{
            padding: '1rem',
            background: '#fff',
            borderRadius: '12px',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <h2>3. Bottle collection</h2>

          <form onSubmit={calculateRefund} style={{ display: 'grid', gap: '1rem' }}>
            <label>
              Tag
              <input type="text" name="tag" value={formData.tag} onChange={handleChange} />
            </label>

            <label>
              Region
              <input type="text" name="region" value={formData.region} onChange={handleChange} />
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

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button type="submit" disabled={loading}>
                {loading ? 'Working...' : 'Calculate refund'}
              </button>

              <button type="button" onClick={saveCollection} disabled={loading}>
                Save collection to bag
              </button>

              <button type="button" onClick={clearAllData}>
                Clear all saved data
              </button>
            </div>
          </form>
        </div>

        {error && <p style={{ color: 'crimson' }}>{error}</p>}

        {result && (
          <div style={{ padding: '1rem', background: '#fff', borderRadius: '12px' }}>
            <h2>Latest result</h2>
            <p>Tag: {result.tag}</p>
            <p>Region: {result.region}</p>
            <p>Bottles: {result.bottleCount}</p>
            <p>Refund per bottle: ${result.refundPerBottle.toFixed(2)}</p>
            <p>
              <strong>Total refund: ${result.refundAmount.toFixed(2)}</strong>
            </p>
          </div>
        )}

        <div style={{ padding: '1rem', background: '#fff', borderRadius: '12px' }}>
          <h2>Stored goals, bags, and bottle collections</h2>

          {goals.length === 0 ? (
            <p>No goals yet.</p>
          ) : (
            goals.map((goal) => (
              <div key={goal._id} style={{ marginBottom: '1rem' }}>
                <h3>{goal.title}</h3>

                {goal.bags.length === 0 ? (
                  <p>No bags yet.</p>
                ) : (
                  goal.bags.map((bag) => (
                    <div key={bag._id} style={{ marginLeft: '1rem', marginBottom: '0.75rem' }}>
                      <h4>{bag.name}</h4>

                      {bag.bottleCollections.length === 0 ? (
                        <p>No bottle collections saved.</p>
                      ) : (
                        <ul>
                          {bag.bottleCollections.map((collection) => (
                            <li key={collection._id}>
                              {collection.bottleCount} × {collection.tag} | {collection.region} |{' '}
                              {collection.moreThanLiter ? '> 1L' : '≤ 1L'} | Total: $
                              {collection.refundAmount.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                )}
              </div>
            ))
          )}
        </div>

        {selectedBag && (
          <div style={{ padding: '1rem', background: '#fff', borderRadius: '12px' }}>
            <h2>Selected bag summary</h2>
            <p>Name: {selectedBag.name}</p>
            <p>Saved collections: {selectedBag.bottleCollections.length}</p>
            <p>
              Total saved refund: $
              {selectedBag.bottleCollections
                .reduce((sum, item) => sum + item.refundAmount, 0)
                .toFixed(2)}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
>>>>>>> origin/flynn4
