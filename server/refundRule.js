const mongoose = require('mongoose');

const refundRuleSchema = new mongoose.Schema({
  tag: { type: String, required: true, trim: true },
  region: { type: String, required: true, trim: true },
  moreThanLiter: { type: Boolean, required: true },
  refund: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('RefundRule', refundRuleSchema);