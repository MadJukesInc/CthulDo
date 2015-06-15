'use strict';

var _ = require('lodash');
var users = require('../../../models/users');
var auth = require('../../../lib/auth');
var passport = require('passport');

module.exports = function (router) {
    router.get('/', auth.isAuthenticated(['admin']),function(req, res) {
        users.get(function(err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            res.send(results);
        });
    });
    router.get('/:id', auth.isAuthenticated(['admin', 'user']),function(req, res) {
        var userID = Number(req.params.id);

        users.get(userID, function(err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            res.send(results);
        });
    });
    router.post('/', auth.isAuthenticated(['admin']),function(req, res) {
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
