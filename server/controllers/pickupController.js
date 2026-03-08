const PickupRequest = require('../models/PickupRequest');

exports.createPickupRequest = async (req, res) => {
  try {
    const { name, address, phone, estimatedBagCount, notes } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!address || !String(address).trim()) {
      return res.status(400).json({ message: 'Address is required' });
    }
    if (!phone || !String(phone).trim()) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    const bagCount = parseInt(estimatedBagCount, 10);
    if (!Number.isInteger(bagCount) || bagCount < 1) {
      return res.status(400).json({ message: 'Estimated bag count must be at least 1' });
    }

    const request = await PickupRequest.create({
      name: String(name).trim(),
      address: String(address).trim(),
      phone: String(phone).trim(),
      estimatedBagCount: bagCount,
      notes: notes ? String(notes).trim() : '',
      region: 'Edmonton',
    });

    return res.status(201).json(request);
  } catch (err) {
    console.error('Create pickup request error:', err);
    return res.status(500).json({ message: err.message || 'Failed to submit pickup request' });
  }
};
