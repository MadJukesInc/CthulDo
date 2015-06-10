'use strict';

var _ = require('lodash');
var tasks = require('../../../models/tasks');


module.exports = function (router) {
    var onTaskPostOrPut = function(req, res) {
        var taskID = req.params.taskID;
        var task = req.body;

        tasks.put(taskID, task, function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            res.send(results);
        });
    };

    router.get('/', function (req, res) {
        tasks.get(function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
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
                throw err;
            }

            res.status(200);
            res.send(results);
        });
    });

    router.get('/:taskID', function(req, res) {
        var taskID = req.params.taskID;

        tasks.get(taskID, function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            res.send(results);
        })
    });

    router.post('/:taskID', onTaskPostOrPut);

    router.put('/:taskID', onTaskPostOrPut);

    router.delete('/:taskID', function(req, res) {
        var taskID = req.params.taskID;

        tasks.delete(taskID, function(err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            res.send(results);
        });
    });
};
