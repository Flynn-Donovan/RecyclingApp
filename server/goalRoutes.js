const express = require('express');
const router = express.Router();
const goalController = require('./goalController');

router.get('/goals', goalController.getGoals);
router.post('/goals', goalController.createGoal);
router.post('/goals/:goalId/bags', goalController.addBag);
router.post('/goals/:goalId/bags/:bagId/bottle-collections', goalController.addBottleCollection);

module.exports = router;