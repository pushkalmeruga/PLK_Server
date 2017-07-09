var config = require('../config');
var User = require('../Models/User.js');
var bodyParser = require('body-parser');

module.exports = function(expressServer) {

    var jsonParser = bodyParser.json();

    //Home URL    
    expressServer.get('/', function(req, res) {
        res.status(200).json('Pushkal');
    });

    //Sign in
    expressServer.post('/signin', jsonParser, function(req, res) {
        User.SignIn(req.body.UserName, req.body.Password, function(result) {
            res.send(result);
        });

    });

    //SignUp
    expressServer.post('/signup', jsonParser, function(req, res) {

        var user = new User({
            UserName: req.body.UserName,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            EmailId: req.body.EmailId,
            Password: req.body.Password,
            DefaultLocation: req.body.DefaultLocation,
            MobileNumber: req.body.Mobile,
            createdDate: Date.now()
        });

        user.SaveUser(function(result) {
            res.send(result);
        });
    })

    //Update profile
    expressServer.post('/updateProfile', jsonParser, function(req, res) {

        var user = new User({
            _id: 0,
            UserName: req.body.UserName,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            EmailId: req.body.EmailId,
            Password: req.body.Password,
            DefaultLocation: req.body.DefaultLocation,
            MobileNumber: req.body.Mobile,
            updatedDate: Date.now()
        });

        user.UpdateProfile(function(result) {
            res.send(result);
        });
    })
};