const express = require('express');
const router = express.Router();
const placesCtrlr = require('../controllers/places-controller');

router.get('/:id', placesCtrlr.getPlacesByPlaceId);

router.get('/users/:uid', placesCtrlr.getPlacesByUserId);
router.post('/', placesCtrlr.createPlace);
router.patch('/:pid', placesCtrlr.updatePlace);
router.delete('/:pid', placesCtrlr.deletePlace);

module.exports = router;
