const HttpError = require('../models/http-error');
const uuid = require('uuid/v4');
const {validationResult} = require('express-validator');
const Place = require('../models/place');

let DUMMY_PLACES = [
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

getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(r => r.creator === userId);
    if(places || places.length > 0) {
        return res.json({placeTitle: places.title});
    }

    next(new HttpError('could not find place with user id', 404));
};

createPlace = (req, res, next) => {
    const errs = validationResult(req);
    if(!errs.isEmpty()) {
        throw new HttpError('invalid inputs', 422);
    }
    const {title, desc, creator} = req.body;
    const createdPlace = new Place({
        title, desc, creator
    });
    try{
        createdPlace.save();
    } catch(err) {
        const error = new HttpError('creating failed..try again', 500);
        return next(error);
    }
    res.status(201).json({place: createdPlace});
};

updatePlace = (req, res, next) => {
    const pid = req.params.pid;
    const {title, desc} = req.body;
    const updatedPlace = {...DUMMY_PLACES.find(x => x.id === pid)};
    const idx = DUMMY_PLACES.findIndex(x => x.id === pid);
    updatedPlace.title = title;
    updatedPlace.desc = desc;
    DUMMY_PLACES[idx] = updatedPlace;
    res.status(200).json({place: updatedPlace});
};

deletePlace = (req, res, next) => {
    const pid = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(x=>x.id != pid);
    res.status(200).json({message: 'deleted'});
};

exports.getPlacesByPlaceId = getPlacesByPlaceId;
exports.getPlacesByUserId= getPlacesByUserId;
exports.createPlace= createPlace;
exports.updatePlace= updatePlace;
exports.deletePlace= deletePlace;
