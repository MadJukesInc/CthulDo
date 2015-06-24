'use strict';

var _ = require('lodash');
var tasks = require('../../../models/tasks');
var auth = require('../../../lib/auth');
var passport = require('passport');


module.exports = function (router) {
    router.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    var onTaskPostOrPut = function (req, res) {
        var taskID = req.params.taskID || req.body.id;
        var task = req.body;
        var userID = req.user.id;

        tasks.put(taskID, task, function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            var wrappedResult = {
                task: results
            };
            res.send(wrappedResult);
        });

    };

    router.put('/',  onTaskPostOrPut);

    router.get('/',  function (req, res) {
        //var user = req.user;
        console.log(req.session.passport);
        tasks.get(function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            var wrappedResult = {
                tasks: results
            };
            res.send(wrappedResult);
        });

    });

    router.post('/',  function (req, res) {
        var newTask = req.body;
        newTask.owner = req.user.id;
        tasks.post(newTask, function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            var wrappedResult = {
                task: results
            };
            res.send(wrappedResult);
        });
    });

    router.get('/:taskID',  function (req, res) {
        //var taskID = req.params.taskID;
        //var user = req.user;
        tasks.get(taskID, function (err, results) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }

            res.status(200);
            var wrappedResult = {
                task: results
            };
            res.send(wrappedResult);
        })
    });

    router.post('/:taskID',  onTaskPostOrPut);

    router.put('/:taskID',  onTaskPostOrPut);

    router.delete('/:id', function (req, res) {
        var taskID = req.params.id;
        var userID = req.user.id;
        tasks.get(taskID, '', function (err, task) {
            if (_.isUndefined(task.owner)) {
                task.owner = req.user.id;
            }
            else if (task.owner !== userID) {
                res.sendStatus(401);
            }
            else {
                tasks.delete(taskID, function (err, results) {
                    if (err) {
                        res.sendStatus(500);
                        throw err;
                    }

                    res.status(200);
                    var wrappedResult = {
                        task: results
                    };
                    res.send(wrappedResult);
                });
            }
        });

    });
};
