'use strict';

var _ = require('lodash');
var users = require('../../../models/users');
var auth = require('../../../lib/auth');
var passport = require('passport');

module.exports = function (router) {
    router.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    router.get('/', function (req, res) {
        users.get(function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            //console.log(results);
            var wrappedResult = {
                users: results
            };
            res.send(wrappedResult);
        });
    });
    router.get('/:id',  function (req, res) {
        var userID = Number(req.params.id);

        users.get(userID, function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            var wrappedResult = {
                user: results
            };
            res.send(wrappedResult);
        });
    });
    router.post('/', function (req, res) {
        var newUser = req.body;

        users.post(newUser, function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            var wrappedResult = {
                user: results
            };
            res.send(wrappedResult);
        });
    });
};
