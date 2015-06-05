'use strict';

var UsersModel = require('../../../models/users');


module.exports = function (router) {
    router.get('/html', function (req, res) {
        var model = new UsersModel();
        model.get(function (err, model) {
            res.render('users',model);
        });
    });
    router.get('/', function (req, res) {
        var model = new UsersModel();
        model.get(function (err, model) {
            res.send(model);
        });
    });
    router.post('/', function (req, res) {
        var model = new UsersModel();
        req.session.user = req.session.user || {};

        var name = req.param('name');

        model.post(req.body, function (err,status) {
            if (!err){
                res.sendStatus(500);
            }
                else {
                res.sendStatus(200);
            }

        });
    });
};
