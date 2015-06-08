'use strict';

var app = require('../../index');
var driver = app.get('db');
var Sequelize = driver.Sequelize;

var Users = require('./Users');

module.exports = driver.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true
    },
    title: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN
    },
    members: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: Sequelize.ARRAY
    },
    owner: {
        type: Sequelize.STRING,
        references: {
            model: Users,
            key: 'name'
        }
    }
});
