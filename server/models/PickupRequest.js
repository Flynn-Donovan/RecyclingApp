const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    estimatedBagCount: { type: Number, required: true, min: 1 },
    notes: { type: String, trim: true, default: '' },
    region: { type: String, trim: true, default: 'Edmonton' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);
