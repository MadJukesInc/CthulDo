'use strict';

var _ = require('lodash');

var Users = require('../lib/dbModels/Users');

var UsersModel = function UsersModelConstructor() {
    return {
        get: function(name, cb) {
            var found;

            if (_.isUndefined(cb) && _.isFunction(name)) {
                cb = name;
                name = null;
            }

            if (_.isNull(name)) {
                found = Users.all();
            }
            else {
                found = Users.findOne({ where: { name: name } });
            }

            return found
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
