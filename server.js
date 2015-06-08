'use strict';

var fs = require('fs');
var http = require('http');
var https = require('https');

var app = require('./index');

var debugPort = process.env.PORT || 8000;
// set to 80 to enable http service
var httpPort = null;
// set to 443 to enable https service
var httpsPort = null;
var debugServer;
var httpServer;
var httpsServer;

var httpsOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
};

debugServer = http.createServer(app).listen(debugPort);
debugServer.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});

if (httpPort) {
    httpServer = http.createServer(app).listen(httpPort);
    httpServer.on('listening', function () {
        console.log('Server listening on http://localhost');
    });
}

if (httpsPort) {
    httpsServer = https.createServer(httpsOptions, app).listen(httpsPort);
    httpsServer.on('listening', function () {
        console.log('Server listening on https://localhost');
    });
}
