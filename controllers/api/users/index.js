'use strict';

var _ = require('lodash');
var users = require('../../../models/users');

module.exports = function (router) {
    router.get('/', function(req, res) {
        users.get(function(err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            res.send(results);
        });
    });

    router.post('/', function(req, res) {
        var newUser = req.body;

        users.post(newUser, function(err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            res.send(results);
        });
    });
};
