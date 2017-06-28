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

itemSchema.statics.GetAll = function(cb) {
    mongoConnection(); //Checking the mongodb connection
    this.find({}, function(err, data) {
        if (err) {
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });

}

module.exports = mongoose.model('Item', itemSchema, 'items');