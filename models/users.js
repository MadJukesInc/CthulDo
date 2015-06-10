'use strict';

var _ = require('lodash');
var B = require('bluebird');

var Users = require('../lib/dbModels/Users');

var UsersModel = function UsersModelConstructor() {
    return {
        get: function (username, cb) {
            var found;
            //var username = usernameString + '';
            //console.log(username);
            if (_.isUndefined(cb) && _.isFunction(username)) {
                cb = username;
                username = null;
            }

            if (_.isNull(username)) {
                found = Users.all();
            }
            else {
                if (_.isString(username)) {
                    found = Users.findOne({where: {username: username}});
                }
                else {
                    found = Users.findById(username);
                }
            }

            return found
                .then(function (result) {
                    cb(null, result);
                })
                .catch(function (err) {
                    cb(err);
                });
        },
        post: function (user, cb) {
            var promises = [];
            var fulfilledPromise;

            if (_.isArray(user)) {
                _.forEach(user, function (v) {
                    promises.push(Users.create(v));
                });
                fulfilledPromise = B.all(promises);
            }
            else if (_.isPlainObject(user)) {
                fulfilledPromise = Users.create(user);
            }

            return fulfilledPromise
                .then(function (result) {
                    cb(null, result);
                })
                .catch(function (err) {
                    cb(err);
                });
        }
    };
};

module.exports = UsersModel();
