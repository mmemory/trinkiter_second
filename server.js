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
mongoose.Promise = global.Promise;
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
var UserCtrl = require('./server/controllers/UserCtrl');
var Trinkits = require('./server/models/TrinkitModel');
var TrinkitCtrl = require('./server/controllers/TrinkitCtrl');

// Authentication
require('./server/config/auth')();

// Endpoints
// app.get('*', function(req, res, next) {
//     res.sendFile(__dirname + '/public/index.html');
// });

function restrict(req, res, next) {
    if(req.isUnauthenticated()) return res.status(403).json({message: 'please login'});
    next();
}

app.post('/api/users/login', passport.authenticate('local'), UserCtrl.login);
app.post('/api/users/register', UserCtrl.register);
app.get('/api/users/current', restrict, UserCtrl.getCurrent);

app.get('/api/trinkits/:category/:value', function(req, res) {
    Trinkits.find(function(err, trinkits) {
        res.json(trinkits);
    });
});

app.get('/api/trinkits', function(req, res) {
    Trinkits.find(function(err, trinkits) {
        res.json(trinkits);
    });
});

app.post('/api/trinkits', restrict, function(req, res) {

    var newTrinkit = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        dollarValue: Number(req.body.dollarValue),
        creator: mongoose.Types.ObjectId(req.user._id)
    };

    Trinkits.create(newTrinkit, function(err, trinkit) {
        if(err) res.status(403).json(err);

        Trinkits.findById({_id: trinkit._id})
            .populate('creator')
            .exec(function(err, result) {
                if(err) res.send(err);
                res.send(result);
            });
    });
});
app.put('/api/trinkits', function(req, res) {

});
app.delete('/api/trinkits', function(req, res) {

});

app.listen(port, function() {
    console.log('Listening on port', port);
});


