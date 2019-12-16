const HttpError = require('../models/http-error');
const uuid = require('uuid/v4');

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'emp st build',
        desc: 'emp st build descr',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'p2 building',
        desc: 'p2 building descr',
        creator: 'u2'
    }
];

getPlacesByPlaceId = (req, res, next) => {
    const placeId = req.params.id;
    const place = DUMMY_PLACES.find(x=>x.id === placeId);
    if (place) {
        const placeTitle = place.title;
        return res.json({placeTitle});
    }
    throw new HttpError('place not find', 404);
};

getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(r => r.creator === userId);
    if(place) {
        return res.json({placeTitle: place.title});
    }

    next(new HttpError('could not find place with user id', 404));
};

createPlace = (req, res, next) => {
    const {title, desc, creator} = req.body;
    const createdPlace = {
        id: uuid(),
        title, desc, creator
    };
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place: createdPlace});
};

exports.getPlacesByPlaceId = getPlacesByPlaceId;
exports.getPlaceByUserId= getPlaceByUserId;
exports.createPlace= createPlace;