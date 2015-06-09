var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone.View.extend({

    /**
     *
     * @chainable
     * @returns {Backbone.View}
     */
    render: function () {
        var template = require('../../templates/layouts/header.dust');
        var self = this;
        template({}, function (err, html) {
            self.$el.append(html);
        });
        return this;
    }
});
