const mongoose = require('mongoose');

const bottleCollectionSchema = new mongoose.Schema(
  {
    tag: { type: String, required: true, trim: true },
    region: { type: String, required: true, trim: true },
    moreThanLiter: { type: Boolean, required: true },
    bottleCount: { type: Number, required: true, min: 1 },
    refundPerBottle: { type: Number, required: true, min: 0 },
    refundAmount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const bagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    bottleCollections: [bottleCollectionSchema],
  },
  { timestamps: true }
);

const goalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    bags: [bagSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);