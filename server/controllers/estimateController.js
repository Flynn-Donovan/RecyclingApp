const { estimateFromVolume, estimateFromWeight } = require('../utils/refund');

exports.postEstimate = async (req, res) => {
  try {
    const { type, volumeL, quantity, weightLb } = req.body;

    if (type === 'volume') {
      const volume = Number(volumeL);
      const qty = quantity != null ? Math.max(1, Math.floor(Number(quantity))) : 1;
      if (!volume || volume <= 0) {
        return res.status(400).json({ message: 'Valid volume (L) is required' });
      }
      const refundAmount = estimateFromVolume(volume, qty);
      return res.status(200).json({ refundAmount, type: 'volume' });
    }

    if (type === 'weight') {
      const weight = Number(weightLb);
      if (!weight || weight <= 0) {
        return res.status(400).json({ message: 'Valid weight (lb) is required' });
      }
      const refundAmount = estimateFromWeight(weight);
      return res.status(200).json({ refundAmount, type: 'weight' });
    }

    return res.status(400).json({ message: 'type must be "volume" or "weight"' });
  } catch (err) {
    console.error('Estimate error:', err);
    return res.status(500).json({ message: err.message || 'Estimate failed' });
  }
};
