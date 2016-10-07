var mongoose = require('mongoose');
var User = require('./UserModel');

var trinkitModel = new mongoose.Schema({
    createdOn: {type: Date, default: Date.now},
    title: {type: String},
    description: {type: String},
    imageUrl: {type: String},
    category: {type: String},
    dollarValue: {type: Number},
    zipcode: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    usersWhoLiked: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    usersWhoViewed: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    usersWhoRemoved: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Trinkit', trinkitModel);