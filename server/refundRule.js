const mongoose = require('mongoose');

// This defines exactly what a "Rule" looks like in your database
const refundRuleSchema = new mongoose.Schema({
  tag: { type: String, required: true},
  region: { type: String, required: true },
  moreThanLiter: { type: Boolean, required: true},
  bottleCount: { type: Number, required: true},
  refund: { type: Number, required: false}
});

// We turn that schema into a "Model" and export it
module.exports = mongoose.model('refundRule', refundRuleSchema);