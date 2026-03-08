const mongoose = require('mongoose');

const collectionItemSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ['bottle', 'bag'] },
    // For type === 'bottle'
    volumeL: { type: Number, min: 0 },
    quantity: { type: Number, min: 1 },
    // For type === 'bag'
    weightLb: { type: Number, min: 0 },
    // Computed refund for this entry (stored for display)
    refundAmount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CollectionItem', collectionItemSchema);
