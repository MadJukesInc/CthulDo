'use strict';

var _ = require('lodash');

var Tasks = require('../lib/dbModels/Tasks');

var TasksModel = function TasksModelConstructor() {
    return {
        /**
         * Find tasks and execute callback
         * @param {Number} [id] ID of the task
         * @param {Function} cb Callback to execute after we found tasks
         * @returns {*}
         */
        get: function (id, cb) {
            var found;

            if (_.isUndefined(cb) && _.isFunction(id)) {
                cb = id;
                id = null;
            }

            if (_.isNull(id)) {
                found = Tasks.all();
            }
            else {
                found = Tasks.findOne({ where: { id: id } });
            }

            return found
                .then(function (results) {
                    cb(null, results);
                })
                .catch(function (err) {
                    cb(err);
                });
        },
        post: function (task, cb) {
            return Tasks.create(task)
                .then(function (err, result) {
                    if (err) {
                        throw err;
                    }

                    cb(null, result);
                })
                .catch(function (err) {
                    cb(err);
                });
        },
        put: function (id, task, cb) {
            return Tasks.update(task, { where: { id: id } })
                .then(function () {
                    console.log(arguments);
                });
        },
        delete: function (id, cb) {
            return Tasks.destroy({ where: { id: id } })
                .then(function () {
                    console.log(arguments);
                });
        }
    }
};


module.exports = TasksModel();
