'use strict';

var app = require('express')();
var kraken = require('kraken-js');


var options = require('./lib/conf');


app.use(kraken(options(app)));


app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

module.exports = app;
