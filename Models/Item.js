var mongoose = require('mongoose');
var mongoConnection = require('../Mongo');
var config = require('../config');

//Item model
var itemSchema = mongoose.Schema({
    IsSold: Boolean,
    ItemType: String,
    PartName: String,
    Model: String,
    Brand: String,
    ItemImages: [],
    Price: Number,
    CustomerUserName: String,
    MobileNumber: String,
    EmailId: String,
    Location: String,
    Description: String,
    createdDate: Date,
    updatedDate: Date
});

//Method to save the Item
itemSchema.methods.SaveItem = function(callBack) {
    mongoConnection(); //Checking the mongodb connection

    this.save().then((res) => {
        return callBack(true);
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

//Get items based on the query
itemSchema.statics.GetItems = function(query, callBack) {
    mongoConnection(); //Checking the mongodb connection
    this.find(query).then((res) => {
        return callBack(res);
    }).catch((err) => {
        return callBack(err);
    });
};

//Update the Item
itemSchema.methods.UpdateItem = function(callBack) {
    mongoConnection();

    mongoose.model('Item').findOneAndUpdate({ '_id': this._id }, this, { new: true }).then((res) => {
        return callBack(res);
    }).catch((err) => {
        return callBack(err);
    });
};

module.exports = mongoose.model('Item', itemSchema, 'items');