'use strict';

var app = require('../../index');
var driver = app.get('db');
var Sequelize = driver.Sequelize;

var Users = driver.define('users', {
    name: {
        type: Sequelize.STRING,
        primaryKey: true
    }
});
Users.sync();

module.exports = Users;
