const express = require('express');
const router = express.Router();
const refundController = require('./refundController');

router.post('/estimate', refundController.postEstimate);

module.exports = router;