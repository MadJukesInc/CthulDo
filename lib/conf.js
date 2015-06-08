'use strict';

module.exports = function (app) {
    return {
        onconfig: function (config, next) {
            /*
             * Add any additional config setup or overrides here. `config` is an initialized
             * `confit` (https://github.com/krakenjs/confit/) configuration object.
             */

            next(null, config);
        }
    };
};
