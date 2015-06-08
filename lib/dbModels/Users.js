'use strict';

var app = require('../../index');
var driver = app.get('db');
var Sequelize = driver.Sequelize;

module.exports = driver.define('users', {
    name: {
        type: Sequelize.STRING,
        field: 'name',
        unique: true
    }
});
