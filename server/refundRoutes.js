const express = require('express');
const router = express.Router();
// Import the controller we just made
const refundController = require('./refundController');

// Define the path
// When someone hits POST /api/estimate, run the controller function
router.post('/estimate', refundController.postEstimate);

module.exports = router;