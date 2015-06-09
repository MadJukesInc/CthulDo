'use strict';

var app = require('../../index');
var driver = app.get('db');
var Sequelize = driver.Sequelize;

var Users = require('./Users');
var Tasks = driver.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN
    },
    members: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
    },
    owner: {
        type: Sequelize.STRING,
        references: {
            model: Users,
            key: 'name'
        }
    }
});
Tasks.sync();

module.exports = Tasks;
