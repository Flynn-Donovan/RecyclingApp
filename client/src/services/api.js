const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText || 'Request failed');
  return data;
}

export const api = {
  postEstimate(body) {
    return request('/estimate', { method: 'POST', body: JSON.stringify(body) });
  },
  getCollection() {
    return request('/collection');
  },
  addToCollection(body) {
    return request('/collection', { method: 'POST', body: JSON.stringify(body) });
  },
  deleteCollectionItem(id) {
    return request(`/collection/${id}`, { method: 'DELETE' });
  },
  clearCollection() {
    return request('/collection', { method: 'DELETE' });
  },
  getDepots() {
    return request('/depots');
  },
  postPickup(body) {
    return request('/pickup', { method: 'POST', body: JSON.stringify(body) });
  },
};
