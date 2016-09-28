var mongoose = require('mongoose');
var Trinkit = require('./TrinkitModel');
var bcrypt = require('bcrypt');

var userModel = new mongoose.Schema({
    userInfo: {
        firstName: {type: String},
        lastName: {type: String},
        email: {type: String},
        username: {type: String},
        password: {type: String}
    },
    createdOn: {type: Date, default: Date.now}
});

userModel.pre('save', function(next) {
    var user = this;
    if (!user.isModified('userInfo.password')) return next();
    bcrypt.hash(user.userInfo.password, 10, function(err, hash) {
        if(err) return next(err);

        user.userInfo.password = hash;
        next();
    });
});

userModel.methods.comparePassword = function(passwordCandidate, cb) {
    return bcrypt.compare(passwordCandidate, this.userInfo.password, function(err, isMatch) {
        if(err) return cb(err);
        return cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userModel);