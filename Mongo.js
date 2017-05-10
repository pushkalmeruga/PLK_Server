var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var config = require('./config');

//Connection to MongoDB
var isConnected = function() {
    var mongoState = mongoose.connection.readyState;
    if (mongoState === 0) {
        mongoose.connect(config.connectionString, function(err) {
            if (err) {
                console.log('Error in the connection..!!');
            }
        });
    }
}

module.exports = isConnected;