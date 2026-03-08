/**
 * Mock Edmonton depots. Replace with Google Places API later if needed.
 */
const MOCK_DEPOTS = [
  {
    id: '1',
    name: 'Downtown Bottle Depot',
    address: '10425 97 St NW, Edmonton, AB',
    hours: 'Mon–Sat, 9 AM – 6 PM',
    note: 'Accepts bottles and cans',
  },
  {
    id: '2',
    name: 'North Edmonton Depot',
    address: '16720 111 Ave NW, Edmonton, AB',
    hours: 'Mon–Sat, 10 AM – 5 PM',
    note: 'Quick drop-off service',
  },
  {
    id: '3',
    name: 'Southside Eco Depot',
    address: '4210 Calgary Trail NW, Edmonton, AB',
    hours: 'Daily, 9 AM – 7 PM',
    note: 'Accepts mixed recycling returns',
  },
];

exports.getDepots = async (req, res) => {
  try {
    return res.status(200).json(MOCK_DEPOTS);
  } catch (err) {
    console.error('Get depots error:', err);
    return res.status(500).json({ message: 'Failed to fetch depots' });
  }
};
