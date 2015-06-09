'use strict';

var _ = require('lodash');
var tasks = require('../../models/tasks');


module.exports = function (router) {
    router.get('/', function (req, res) {
        tasks.get(function (err, results) {
            if (err) {
                res.sendStatus(500);
                return;
            }

            res.status(200);
            res.send(results);
        });
    });

    router.post('/', function(req, res) {
        var newTask = req.body;

        tasks.post(newTask, function (err, results) {
            if (err) {
                res.sendStatus(500);
                return;
            }

            res.status(200);
            res.send(results);
        });
    });

    router.get('/:taskID', function(req, res) {

    });

    router.put('/:taskID', function(req, res) {

    });

    router.patch('/:taskID', function(req, res) {

    });

    router.delete('/:taskID', function(req, res) {

    });
};
