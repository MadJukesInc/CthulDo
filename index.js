'use strict';

var app = require('express')();
var kraken = require('kraken-js');
var passport = require('passport');
var auth = require('./lib/auth');
var flash = require('connect-flash');
var session = require('express-session')
//var UserModel = require('./models/Users');

var options = require('./lib/conf');

passport.use(new auth.localStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    var user = {
        id: 'test',
        username: 'bob',
        password: 'bob',
        role: 'admin'
    };
    done(null, user);
});

app.use(kraken(options(app)))
    .use(session({secret: 'keyboard cat'}))
    .use(passport.initialize())
    .use(passport.session())
    .use(flash())
    .use(auth.injectUser);

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

module.exports = app;
