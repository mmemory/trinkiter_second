var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('./../models/UserModel');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done) {

        Users.findOne({'userInfo.username': username}, function(err, user) {
            if(err) return done(err);
            if(!user) return done(null, false);
            user.comparePassword(password, function(err, isMatch) {
                if(!isMatch) return done(null, false);
                console.log(user.userInfo.username, 'is signed in.');
                done(null, user);
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Users.findById({_id: id}, function(err, user) {
            if(err) console.log(err);
            done(null, user);
        })
    });
};