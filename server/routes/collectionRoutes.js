const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

router.get('/collection', collectionController.getCollection);
router.post('/collection', collectionController.addToCollection);
router.delete('/collection/:id', collectionController.deleteCollectionItem);
router.delete('/collection', collectionController.clearCollection);

module.exports = router;
