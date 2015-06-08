'use strict';

var fs = require('fs');
var http = require('http');
var https = require('https');

var app = require('express')();
var kraken = require('kraken-js');

var options = require('./lib/conf');

var debugPort = process.env.PORT || 8000;
var httpPort = 80;
var httpsPort = 443;
var debugServer;
var httpServer;
var httpsServer;

var httpsOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
};

app.use(kraken(options(app)));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

debugServer = http.createServer(app).listen(debugPort);
debugServer.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});

httpServer = http.createServer(app).listen(httpPort);
httpServer.on('listening', function () {
    console.log('Server listening on http://localhost');
});

httpsServer = https.createServer(httpsOptions, app).listen(httpsPort);
httpsServer.on('listening', function () {
    console.log('Server listening on https://localhost');
});
