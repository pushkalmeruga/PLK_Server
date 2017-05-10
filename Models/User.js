var mongoose = require('mongoose');
var mongoConnection = require('../Mongo');
var config = require('../config');
var salesSchema = require('./Sale');
var locationSchema = require('./Location');

//user model
var userSchema = mongoose.Schema({
    _id: String,
    userName: String,
    googleId: String,
    accessToken: String,
    password: String,
    createdDate: Date,
    updatedDate: Date
});

//Method to save the user
userSchema.methods.SaveUser = function(cb) {
    var result = null;
    mongoConnection(); //Checking the mongodb connection
    this.save(function(err) {
        if (err) {
            return cb(err, null);
        } else {
            return cb(null, true);
        }
    });
    return cb(null, null);

}

//Method to find the user
userSchema.statics.findUser = function(googleId, cb) {
    mongoConnection(); //Checking the mongodb connection
    this.findOne({ 'googleId': googleId }, function(err, data) {
        if (data) {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    });
}

// userSchema.methods.UpdateUser = function(location, cb) {
//     this.
// }

module.exports = mongoose.model('User', userSchema, 'Users');