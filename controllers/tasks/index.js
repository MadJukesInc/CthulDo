'use strict';

var _ = require('lodash');
var TasksModel = require('../../models/tasks');


module.exports = function (router) {
    var tasks = new TasksModel();

    router.get('/', function (req, res) {
        res.status(200);
        res.send(tasks);
    });

    router.post('/', function(req, res) {
        var newTask = req.body;

        tasks.push(newTask);

        res.status(200);
        res.send(newTask);
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
