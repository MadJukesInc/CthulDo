'use strict';

var database = require('./database');

module.exports = function (app) {
    return {
        onconfig: function (config, next) {
            /*
             * Add any additional config setup or overrides here. `config` is an initialized
             * `confit` (https://github.com/krakenjs/confit/) configuration object.
             */

            var dbConfig = config.get('databaseConfig');
            var db = database(dbConfig);

            app.set('db', db);
            next(null, config);
        }
    };
};
