const express = require('express');
const router = express.Router();
const depotsController = require('../controllers/depotsController');

router.get('/depots', depotsController.getDepots);

module.exports = router;
