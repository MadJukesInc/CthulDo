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

            var passport = require('passport');
            var auth = require('./auth');
            var flash = require('connect-flash');
            var session = require('express-session');
            var Users = require('../models/users');


            passport.use(new auth.localStrategy());
            passport.serializeUser(function (user, done) {
                done(null, user.id);
            });

            passport.deserializeUser(function (id, done) {
                Users.get(id, function (err, user) {
                    done(null, user);
                })
            });
            //require('./dust-helper');
            app.use(session({secret: 'keyboard cat'}))
                .use(passport.initialize())
                .use(passport.session())
                .use(flash())
                .use(auth.injectUser);
            next(null, config);
        }
    };
};
