var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone.View.extend({

    render: function () {
        var template = require('../../templates/index.dust');
        var self = this;
        template({}, function (err, html) {
            self.$el.append(html);
        });

        return this;
    }

});
