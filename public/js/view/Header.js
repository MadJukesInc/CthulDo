var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone.View.extend({

    /**
     * @property    {String}    tagName
     */
    tagName: 'h1',

    /**
     *
     * @chainable
     * @returns {Backbone.View}
     */
    render: function () {
        this.$el.append('Marionette Application Example');
        return this;
    }
});
