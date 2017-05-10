var mongoose = require('mongoose');
var mongoConnection = require('../Mongo');
var config = require('../config');

//Sale model
var saleSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    isSold: Boolean,
    CustomerId: String,
    createdDate: Date,
    updatedDate: Date
});