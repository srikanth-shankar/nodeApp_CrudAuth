const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');

const placesRoutes = require('./routes/places-routes');
const app = express();
app.use(bodyParser.json());

app.use('/api/places',placesRoutes);

app.use((req, res, next) =>{
     throw new HttpError('could not find', 404);
});
app.use((err, req, res, next) => {
    if(res.headerSent) {
        return next(err);
    }
    res.status(500).json({msg: err.message || 'some err occurd'})
});

app.listen(3000);

