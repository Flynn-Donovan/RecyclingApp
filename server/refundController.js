const RefundRule = require('./refundRule.js');

exports.postEstimate = async (req, res) => {
  try {
    const { tag, region, moreThanLiter, bottleCount } = req.body;

    if (!tag) {
      return res.status(400).json({ message: 'Tag missing' });
    }

    if (!region) {
      return res.status(400).json({ message: 'Region missing' });
    }

    if (typeof moreThanLiter !== 'boolean') {
      return res.status(400).json({ message: 'moreThanLiter must be true or false' });
    }

    if (!Number.isInteger(bottleCount) || bottleCount <= 0) {
      return res.status(400).json({ message: 'bottleCount must be a positive integer' });
    }

    const rule = await RefundRule.findOne({
      tag,
      region,
      moreThanLiter
    });

    if (!rule) {
      return res.status(404).json({ message: 'No matching refund rule found' });
    }

    const totalRefund = rule.refund * bottleCount;

    return res.status(200).json({
      tag,
      region,
      moreThanLiter,
      bottleCount,
      refundPerBottle: rule.refund,
      refundAmount: totalRefund
    });
  } catch (err) {
    console.error('Refund estimate error:', err);
    return res.status(500).json({
      success: false,
      errorMessage: err.message
    });
  }
};