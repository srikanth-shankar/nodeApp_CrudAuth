const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();
app.use(bodyParser.json());

app.use('/api/places',placesRoutes);
app.use('/api/users',usersRoutes);

app.use((req, res, next) =>{
     throw new HttpError('could not find', 404);
});
app.use((err, req, res, next) => {
    if(res.headerSent) {
        return next(err);
    }
    res.status(500).json({msg: err.message || 'some err occurd'})
});

mongoose.connect('mongodb://sri:<password>@cluster0-shard-00-00-m6hr7.mongodb.net:27017,cluster0-shard-00-01-m6hr7.mongodb.net:27017,cluster0-shard-00-02-m6hr7.mongodb.net:27017/nodeApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
    .then(()=>{
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err);
    });