var mongoose = require('mongoose');
var mongoConnection = require('../Mongo');
var config = require('../config');

//user model
var locationSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    lat: String,
    lon: String,
});

module.exports = mongoose.model('Location', locationSchema, 'User_Locations');