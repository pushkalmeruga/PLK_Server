var mongoose = require('mongoose');
var mongoConnection = require('../Mongo');
var config = require('../config');

//Item model
var itemSchema = mongoose.Schema({
    isSold: Boolean,
    Name: String,
    Model: String,
    Brand: String,
    snaps: [],
    Price: Number,
    CustomerId: String,
    createdDate: Date,
    updatedDate: Date
});

//Method to save the Item
itemSchema.methods.SaveItem = function(cb) {
    var result = null;
    mongoConnection(); //Checking the mongodb connection
    this.save(function(err) {
        if (err) {
            return cb(err, false);
        } else {
            return cb(null, true);
        }
    });
    return cb(null, null);
}

module.exports = mongoose.model('Item', itemSchema, 'items');