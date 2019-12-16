const express = require('express');
const router = express.Router();
const placesCtrlr = require('../controllers/places-controller');
const usersCtrlr = require('../controllers/users-controller');


router.get('/:id', placesCtrlr.getPlacesByPlaceId);

router.get('/users/:uid', placesCtrlr.getPlaceByUserId);
router.post('/', placesCtrlr.createPlace);

module.exports = router;
