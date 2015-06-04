'use strict';

var UsersModel = require('../../models/users');


module.exports = function (router) {

    router.get('/', function (req, res) {
        var model = new UsersModel();
        model.get(function (err, model) {
            res.render('users', model);
        });
    });
    router.post('/', function (req, res) {
        var model = new UsersModel();
        req.session.user = req.session.user || {};

        var name = req.param('name');

        model.post(req.body);
    });
};
