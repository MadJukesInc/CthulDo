'use strict';

var app = require('../../index');
var driver = app.get('db');
var Sequelize = driver.Sequelize;

var Users = driver.define('users', {
    username: {
        type: Sequelize.TEXT,
        unique: true
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    password: {
        type: Sequelize.TEXT
    },
    role: {
        type: Sequelize.TEXT
    }
});


module.exports = Users;
