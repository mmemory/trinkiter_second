var Users = require('./../models/UserModel');
var Trinkits = require('./../models/TrinkitModel');

module.exports = {

    getCurrent: function(req, res) {

        Users.findById({_id: req.user._id})
            .select('-userInfo.password')
            .populate('finalMatches')
            .exec(function(err, currentUser) {
                res.status(200).json(currentUser);
            });
    },

    login: function(req, res) {
        res.status(200).json({message: 'logged in'});
    },

    logout: function(req, res) {
        req.logout();
        res.status(200).send({message: 'user logged out'});
    },

    register: function(req, res) {

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
                    else res.status(200).json({message:'User registered successfully'});
                });
            } else {
                res.status(409).json({message: 'User already exists by that username'});
            }
        });
    }
};