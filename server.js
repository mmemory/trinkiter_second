var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var port = 3000;

// DB connect
var mongoUri = 'mongodb://localhost/trinkiter';
mongoose.connect(mongoUri);

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});

// authentication
// passport.use(new LocalStrategy(function(username, password, done) {
//
// }));

// app.post('/api/users', function(req, res) {
//
// });

app.post('/api/users/login', function(req, res) {
    console.log(req.body);
    var newUser = {
        username: req.body.username
    };
    res.send(newUser);
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


