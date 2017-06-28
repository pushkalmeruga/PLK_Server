//Getting the required modules
var express = require('express');
var loginController = require('./Controllers/LogInController');
var salesController = require('./Controllers/SalesController');
var server = express();

loginController(server);
salesController(server);

server.listen(8080, function(err, data) {
    console.log('server is listening to port number 8080:');
})