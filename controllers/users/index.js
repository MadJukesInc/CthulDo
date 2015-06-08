'use strict';

var _ = require('lodash');
var Users = require('../../models/users');

module.exports = function (router) {
    router.get('/', function(req, res) {
        res.status(200);
        res.send(users);
    });
};
