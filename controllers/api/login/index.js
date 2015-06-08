'use strict';

var _ = require('lodash');

module.exports = function(router) {
    router.post('/', function(req, res) {
        res.sendStatus(200);
    });
};
