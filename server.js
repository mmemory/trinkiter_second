var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var port = 3000;

// DB connect
var mongoUri = 'mongodb://localhost/trinkiter';
mongoose.connect(mongoUri);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false
})); // TODO move this info to config file
app.use(passport.initialize());
app.use(passport.session());

// Local imports
var Users = require('./server/models/UserModel');

// Authentication
require('./server/config/auth')();

// Endpoints
// app.get('*', function(req, res, next) {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.post('/api/users/login', passport.authenticate('local'), function(req, res) {
    var userInfo = req.user.userInfo;
    var returnResponse = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        username: userInfo.username
    };
    res.status(200).redirect('/#/dashboard/trinkits');
});

app.post('/api/users/register', function(req, res) {

    var userPayload = {
        userInfo: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
    };

    Users.findOne({'userInfo.username': userPayload.userInfo.username}, function(err, existingUser) {
        if(err) res.status(500).json(err);

        if(!existingUser) {
            Users.create(userPayload, function(err, user) {
                if(err) res.status(500).json(err);
                else res.status(200).json(user);
            });
        } else {
            res.status(409).json({message: 'User already exists by that username'});
        }
    });
});

app.get('/api/users/current', function(req, res) {
    console.log(req.session);
    console.log('req.session.user',req.session.user);
    console.log('req.user',req.user);
    if(req.session.user) res.status(200).json(req.session.user);
    else res.status(401).json({message: 'There is no user logged in'});
});

app.get('/api/trinkits', function(req, res) {

});
app.post('/api/trinkits', function(req, res) {

});
app.put('/api/trinkits', function(req, res) {

});
app.delete('/api/trinkits', function(req, res) {

});

app.listen(port, function() {
    console.log('Listening on port', port);
});


