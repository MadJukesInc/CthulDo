'use strict';

var _ = require('lodash');
var UsersModel = require('../../../models/users');

module.exports = function (router) {
    var users = new UsersModel();

    router.get('/', function(req, res) {
        res.status(200);
        res.send(users);
    });
};
