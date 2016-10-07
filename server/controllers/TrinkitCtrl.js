var Trinkits = require('./../models/TrinkitModel');
var Users = require('./../models/UserModel');
var mongoose = require('mongoose');

module.exports = {

    getAllTrinkits: function(req, res) {
        Trinkits.find(function(err, trinkits) {
            res.json(trinkits);
        });
    },

    getTrinkitsByUserId: function(req, res) {
        Trinkits.find({creator: req.params.userId}, function(err, trinkits) {
            res.json(trinkits);
        });
    },

    getTrinkitsByCategoryOrValue: function(req, res) {
        Trinkits.find(function(err, trinkits) {
            res.json(trinkits);
        });
    },

    isInMatchArray: function (matchArray, searchValue, matchValue) {
        var index = matchArray.map(function(x) {return String(x[searchValue]);}).indexOf(String(matchValue));
        return (index < 0);
    },

    dislikeTrinkit: function(req, res) {
        Trinkits.findById(req.params.trinkitId, function(err, trinkit) {
            Users.findByIdAndUpdate(req.user._id, {$addToSet: {trinkitHideList: trinkit._id}}, {new: true}, function(err, user) {



            });
        });
    },

    likeTrinkit: function(req, res) {
        Trinkits.findByIdAndUpdate(req.params.trinkitId, {$addToSet: {usersWhoLiked: mongoose.Types.ObjectId(req.user._id)}}, {new: true}, function(err, trinkit) {
            if (err) res.status(403).json({error: err, message: 'Trinkit not found when trying to like'});
            Users.findByIdAndUpdate(req.user._id, {$addToSet: {trinkitHideList: trinkit._id}}, {new: true},function(err, user) {
                if(err) res.status(403).json({error: err, message: 'CurrentUser not found when liking Trinkit'});
                Users.findById(trinkit.creator, function(err, creator) {
                    if(err) res.status(403).json({error: err, message: 'OtherUser not found when liking Trinkit'});
                    if(user.finalMatches.indexOf(creator._id) >= 0) {
                        // If there is already a final match between the two users then do nothing
                        res.end();
                    } else {
                        if(user.possibleMatches.indexOf(creator._id) < 0) {
                            // If no possible match exists on currentUser's data,
                            // then create one on the other user's data
                            Users.findByIdAndUpdate(trinkit.creator, {$push: {possibleMatches: mongoose.Types.ObjectId(user._id)}}, function(err) {
                                if(err) res.status(403).json({error: err, message: 'Creator not found when liking Trinkit'});
                                res.end();
                            });
                        } else {
                            // Create final match on both users if a possible match already exists.
                            // Also delete the possible matches for both users that refer to each other
                            var addToSetAndDelete = {
                                $addToSet: {finalMatches: mongoose.Types.ObjectId(creator._id)},
                                $pull: {possibleMatches: mongoose.Types.ObjectId(creator._id)}
                            };
                            Users.findByIdAndUpdate(user._id, addToSetAndDelete)
                                .select('-userInfo.password')
                                .exec(function(err, updatedUser) {
                                    if(err) res.status(403).json({error: err, message: 'User not found when trying to create final match on CurrentUser'});
                                    addToSetAndDelete = {
                                        $addToSet: {finalMatches: mongoose.Types.ObjectId(updatedUser._id)},
                                        $pull: {possibleMatches: mongoose.Types.ObjectId(updatedUser._id)}
                                    };
                                    Users.findByIdAndUpdate(creator._id, addToSetAndDelete, function(err) {
                                        if(err) res.status(403).json({error: err, message: 'User not found when trying to create final match on OtherUser'});
                                        res.status(200).json(updatedUser)
                                    });
                                });
                        }
                    }
                });
            });
        });
    },

    createTrinkit: function(req, res) {

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
    }

};