'use strict';

var _ = require('lodash');
var tasks = require('../../../models/tasks');


module.exports = function (router) {
    var onTaskPostOrPut = function (req, res) {
        var taskID = req.params.taskID || req.body.id;
        var task = req.body;
        if (_.isUndefined(task.owner)) {
            task.owner = req.user.id;
        }
        else if (task.owner !== req.user.id) {
            res.sendStatus(401);
        }
        else {
            tasks.put(taskID, task, function (err, results) {
                if (err) {
                    res.sendStatus(500);
                    throw err;
                }

                res.status(200);
                res.send(results);
            });
        }
    };
    router.put('/', onTaskPostOrPut);
    router.get('/', function (req, res) {
        var user = req.user;
        tasks.get(user,function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            res.send(results);
        });

    });

    router.post('/', function (req, res) {
        var newTask = req.body;
        newTask.owner = req.user.id;
        tasks.post(newTask, function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            res.send(results);
        });
    });

    router.get('/:taskID', function (req, res) {
        var taskID = req.params.taskID;
        var user = req.user;
        tasks.get(taskID,user, function (err, results) {
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

    router.delete('/:id', function (req, res) {
        var taskID = req.params.id;
        tasks.get(taskID, function (err, task) {
            if (_.isUndefined(task.owner)) {
                task.owner = req.user.id;
            }
            else if (task.owner !== req.user.id) {
                res.sendStatus(401);
            }
            else {
                tasks.delete(taskID, function (err, results) {
                    if (err) {
                        res.sendStatus(500);
                        throw err;
                    }

                    res.status(200);
                    res.send(results);
                });
            }
        });

    });
};
