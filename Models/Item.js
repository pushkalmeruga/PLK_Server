var mongoose = require('mongoose');
var mongoConnection = require('../Mongo');
var config = require('../config');

//Item model
var itemSchema = mongoose.Schema({
    isSold: Boolean,
    ItemName: String,
    Model: String,
    Brand: String,
    snaps: [],
    Price: Number,
    CustomerId: String,
    MobileNumber: String,
    EmailId: String,
    createdDate: Date,
    updatedDate: Date
});

//Method to save the Item
itemSchema.methods.SaveItem = function(callBack) {
    mongoConnection(); //Checking the mongodb connection

    this.save().then((res) => {
        return callBack(res);
    }).catch((err) => {
        return callBack(err);
    });
}

//Get all the Items
itemSchema.statics.GetAllItems = function(callBack) {
    mongoConnection(); //Checking the mongodb connection
    this.find({}).then((res) => {
        return callBack(res);
    }).catch((err) => {
        return callBack(err);
    });

}

module.exports = mongoose.model('Item', itemSchema, 'items');