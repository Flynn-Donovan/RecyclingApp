const express = require('express');
const router = express.Router();
const estimateController = require('../controllers/estimateController');

router.post('/estimate', estimateController.postEstimate);

module.exports = router;
