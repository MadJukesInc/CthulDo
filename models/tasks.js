'use strict';

var _ = require('lodash');
var B = require('bluebird');

var Tasks = require('../lib/dbModels/Tasks');

/**
 * Function returns map to work with {@link Tasks} table
 * @returns {{get: Function, post: Function, put: Function, delete: Function}}
 * @constructor
 */
var TasksModel = function TasksModelConstructor() {
    return {
        /**
         * Find tasks and execute callback
         * @param {Number} [id] ID of the task
         * @param {Function} cb Callback to execute after we found tasks
         * @returns {*}
         */
        get: function (id,user, cb) {
            var found;

            if (_.isUndefined(cb) && _.isFunction(user)) {
                cb = user;
                user = id;
                id = null;
            }

            if (_.isNull(id)) {
                found = Tasks.findAll({where: {$or: [{owner: user.id},{ members: {$contains: [user.username]}}]}});
            }
            else {
                found = Tasks.findById(id);
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
            var promises = [];
            var fulfilledPromise;

            if (_.isArray(task)) {
                _.forEach(user, function(v) {
                    promises.push(Tasks.create(v));
                });
                fulfilledPromise = B.all(promises);
            }
            else if (_.isPlainObject(task)) {
                fulfilledPromise = Tasks.create(task);
            }

            return fulfilledPromise
                .then(function (result) {
                    cb(null, result);
                })
                .catch(function (err) {
                    cb(err);
                });
        },
        put: function (id, task, cb) {
            return Tasks.update(task, { where: { id: id } })
                .then(function (affected) {
                    cb(null, { 'affected': affected[0] });
                })
                .catch(function (err) {
                    cb(err);
                });
        },
        delete: function (id, cb) {
            return Tasks.destroy({ where: { id: id } })
                .then(function (affected) {
                    cb(null, { 'affected': affected });
                })
                .catch(function (err) {
                    cb(err);
                });
        }
    }
};


module.exports = TasksModel();
