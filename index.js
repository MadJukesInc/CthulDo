'use strict';

var app = require('express')();
var kraken = require('kraken-js');
var passport = require('passport');
var auth = require('./lib/auth');
var flash = require('connect-flash');
var session = require('express-session')
//var UserModel = require('./models/Users');


var options = require('./lib/conf');

app.use(kraken(options(app)));

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

module.exports = app;
