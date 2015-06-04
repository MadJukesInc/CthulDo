'use strict';

var db = require('../lib/database');


module.exports = function UsersModel() {
    return {
        get: function (cb) {
            db.getUsers(function (err, result) {
                if (err) {
                    cb(err);
                }
                else {
                    cb(null, {
                        name: 'users',
                        users: result
                    });
                }

            });
        },
        post: function (user) {
            db.postUsers(user);
        }
    }

};

