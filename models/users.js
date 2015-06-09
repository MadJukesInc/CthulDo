'use strict';

var Users = require('../lib/dbModels/Users');

var UsersModel = function UsersModelConstructor() {
    return {
        get: function(cb) {
            return Users.all()
                .then(function (result) {
                    cb(null, result);
                })
                .catch(function (err) {
                    cb(err);
                });
        },
        post: function(user, cb) {
            return Users.create(user)
                .then(function(result) {
                    cb(null, result);
                })
                .catch(function (err) {
                    cb(err);
                });
        }
    };
};

module.exports = UsersModel();
