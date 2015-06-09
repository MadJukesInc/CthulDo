'use strict';

var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(dbConfig) {
    var newDB;

    if (dbConfig.url && _.isString(dbConfig.url)) {
        newDB = new Sequelize(dbConfig.url);
    }
    else {
        newDB = new Sequelize(dbConfig.database, dbConfig.user,
            dbConfig.password, dbConfig.options);
    }

    return newDB;
};
