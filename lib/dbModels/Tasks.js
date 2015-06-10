'use strict';

var app = require('../../index');
var driver = app.get('db');
var Sequelize = driver.Sequelize;

var Users = require('./Users');
var Tasks = driver.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    title: {
        type: Sequelize.TEXT
    },
    completed: {
        type: Sequelize.BOOLEAN
    },
    members: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: []
    },
    owner: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    }
});

Users.sync().then(function() {
    Tasks.sync();
});

module.exports = Tasks;
