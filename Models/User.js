var mongoose = require('mongoose');
var mongoConnection = require('../Mongo');
var config = require('../config');

//user model
var userSchema = mongoose.Schema({
    UserName: String,
    FirstName: String,
    LastName: String,
    EmailId: String,
    Password: String,
    ProfilePic: String,
    DefaultLocation: String,
    MobileNumber: String,
    createdDate: Date,
    updatedDate: Date
});

//save the user
userSchema.methods.SaveUser = function(callback) {

    mongoConnection(); //Checking the mongodb connection

    mongoose.model('User').findOne({ 'UserName': this.UserName }).then((res) => {
        if (res) {
            return callback('Username already exists. Try with other username..!!');
        } else {
            this.save()
                .then((result) => {
                    return callback(result);
                })
                .catch((err) => {
                    return callback(err);
                });
        }
    }).catch((err) => {
        return callback(err);
    });
}

//Sign in
userSchema.statics.SignIn = function(userName, password, callback) {
    mongoConnection(); //Checking the mongodb connection

    this.findOne({ 'UserName': userName, 'Password': password }).then((res) => {
        return callback(res);
    }).catch((err) => {
        return callback(err);
    });
}

//Update profile
userSchema.methods.UpdateProfile = function(callBack) {
    mongoConnection(); //Checking the mongodb connection

    mongoose.model('User').findOneAndUpdate({ 'UserName': this.UserName }, this, { new: true }).then((res) => {
        return callBack(res);
    }).catch((err) => {
        return callBack(err);
    });
}

module.exports = mongoose.model('User', userSchema, 'Users');