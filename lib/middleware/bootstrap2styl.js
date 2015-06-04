var stylus = require('stylus');
var bootstrap = require('bootstrap-styl');

module.exports = function(options) {
    options.ext = options.ext || 'styl';

    return function styl(data, args, callback) {
        var config = {
            filename: args.context.filePath,
            paths: args.paths
        };

        stylus(data.toString(), config)
            .use(bootstrap())
            .render(callback);
    };
};
