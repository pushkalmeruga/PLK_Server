var mongoose = require('mongoose');
var mongoConnection = require('../Mongo');
var config = require('../config');

//user model
var saleSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    isSold: Boolean,
    createdDate: Date,
    updatedDate: Date
});