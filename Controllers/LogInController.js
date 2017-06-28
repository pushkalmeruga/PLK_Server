var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var User = require('../Models/User.js');
var Location = require('../Models/Location');
var bodyParser = require('body-parser');

passport.use('google', new GoogleStrategy({
        clientID: config.WebClientId,
        clientSecret: config.WebClientSecret,
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {

        //Find user and if doesn't exist create a new user        
        User.findUser(profile.id, function(err, data) {
            if (data === false) {
                var user = new User({
                    userName: profile.displayName,
                    googleId: profile.id,
                    accessToken: accessToken,
                    password: profile.emails[0].value,
                    createdDate: Date.now(),
                    updatedDate: ''
                });

                //save the user if not found                
                user.SaveUser(function(err, result) {
                    if (err) {
                        throw err;
                    }
                    if (result === true) {
                        console.log('User is saved successfully..!!');
                    }
                });
            } else if (data === true) {
                console.log('User already exists..!!');
            }
        });
        return done(null, profile.id);
    }

));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    cosole.log('deserialize ' + user)
    done(null, user);
});

module.exports = function(expressServer) {

    var jsonParser = bodyParser.json();

    //Initializing the passport.js
    expressServer.use(passport.initialize());

    //Home URL    
    expressServer.get('/', function(req, res) {
        res.status(200).json('Pushkal');
    });

    //Google Authentication    
    expressServer.get('/auth/google',
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }));

    //Callback after the Google Authentication    
    expressServer.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/auth' }),
        function(req, res) {
            res.redirect('/');
        }
    );

    //Normal Login
    expressServer.post('/signin', jsonParser, function(req, res) {
        var usame = req.body.username;
        var password = req.body.password;

        User.findOne({ userName: req.body.username }, function(error, data) {
            if (error) {
                console.error(error);
            }
            res.json('working');
        });

    });
};