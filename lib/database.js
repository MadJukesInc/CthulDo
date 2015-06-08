'use strict';

var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(dbConfig) {
    if (dbConfig.url && _.isString(dbConfig.url)) {
        return new Sequelize(dbConfig.url);
    }

    return new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password,
        dbConfig.options);
};
