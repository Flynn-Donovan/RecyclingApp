const CollectionItem = require('../models/CollectionItem');
const { estimateFromVolume, estimateFromWeight } = require('../utils/refund');

exports.getCollection = async (req, res) => {
  try {
    const items = await CollectionItem.find().sort({ createdAt: -1 });
    const totalRefund = items.reduce((sum, item) => sum + (item.refundAmount || 0), 0);
    return res.status(200).json({ items, totalRefund });
  } catch (err) {
    console.error('Get collection error:', err);
    return res.status(500).json({ message: 'Failed to fetch collection' });
  }
};

exports.addToCollection = async (req, res) => {
  try {
    const { type, volumeL, quantity, weightLb } = req.body;

    if (type === 'bottle') {
      const volume = Number(volumeL);
      const qty = Math.max(1, Math.floor(Number(quantity)) || 1);
      if (!volume || volume <= 0) {
        return res.status(400).json({ message: 'Valid volume (L) is required for bottle entry' });
      }
      const refundAmount = estimateFromVolume(volume, qty);
      const item = await CollectionItem.create({
        type: 'bottle',
        volumeL: volume,
        quantity: qty,
        refundAmount,
      });
      return res.status(201).json(item);
    }

    if (type === 'bag') {
      const weight = Number(weightLb);
      if (!weight || weight <= 0) {
        return res.status(400).json({ message: 'Valid weight (lb) is required for bag entry' });
      }
      const refundAmount = estimateFromWeight(weight);
      const item = await CollectionItem.create({
        type: 'bag',
        weightLb: weight,
        refundAmount,
      });
      return res.status(201).json(item);
    }

    return res.status(400).json({ message: 'type must be "bottle" or "bag"' });
  } catch (err) {
    console.error('Add to collection error:', err);
    return res.status(500).json({ message: err.message || 'Failed to add to collection' });
  }
};

exports.deleteCollectionItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await CollectionItem.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({ message: 'Deleted', id });
  } catch (err) {
    console.error('Delete collection item error:', err);
    return res.status(500).json({ message: 'Failed to delete item' });
  }
};

exports.clearCollection = async (req, res) => {
  try {
    await CollectionItem.deleteMany({});
    return res.status(200).json({ message: 'Collection cleared' });
  } catch (err) {
    console.error('Clear collection error:', err);
    return res.status(500).json({ message: 'Failed to clear collection' });
  }
};
