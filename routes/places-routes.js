const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const placesCtrlr = require('../controllers/places-controller');

router.get('/:id', placesCtrlr.getPlacesByPlaceId);

router.get('/users/:uid', placesCtrlr.getPlacesByUserId);
router.post('/', [
    check('title').not().isEmpty(),
    check('desc').isLength({min: 6})
], placesCtrlr.createPlace);
router.patch('/:pid', placesCtrlr.updatePlace);
router.delete('/:pid', placesCtrlr.deletePlace);

module.exports = router;
