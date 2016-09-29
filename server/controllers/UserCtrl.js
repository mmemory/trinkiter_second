var Users = require('./../models/UserModel');
var Trinkits = require('./../models/TrinkitModel');

module.exports = {

    getCurrent: function(req, res) {
        // if(req.user) res.status(200).json(req.user);
        // else res.status(401).json({message: 'There is no user logged in'});

        Users.findById({_id: req.user._id})
            .select('-userInfo.password')
            .exec(function(err, currentUser) {
                res.status(200).json(currentUser);
            });
    },

    login: function(req, res) {
        res.status(200).json({message: 'logged in'});
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
                    else res.status(200).redirect('/#/dashboard/trinkits');
                });
            } else {
                res.status(409).json({message: 'User already exists by that username'});
            }
        });
    }
};