var path = require('path');

var stylus = require('stylus');
var bootstrap = require('bootstrap-styl');

module.exports = function(options) {
    options.ext = options.ext || 'styl';

    return function styl(data, args, callback) {
        var config = {
            filename: args.context.filePath,
            paths: args.paths
        };

        var dir = require.resolve('bootstrap-styl');
        dir = path.dirname(dir);

        stylus(data.toString(), config)
            //TODO add option to go through the array of middlewares and load
            //them all
            .use(bootstrap())
            .define('url', stylus.url({ paths: [dir] }))
            .render(callback);
    };
};
