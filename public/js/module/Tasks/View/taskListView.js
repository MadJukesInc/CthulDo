var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var AppInstance;
//var template = require('../../../../templates/tasks.dust');

module.exports = Backbone.View.extend({
    /**
     * @returns {Object}
     */
    events: function () {
        return {
            'submit': 'onAddTask'
        };
    },

    /**
     *
     * @chainable
     * @returns {Backbone.View}
     */

    render: function () {
        this.$el.empty();

        //TODO Enable this when template is in place
        //var self = this;
        //$.get("/api/users", function (data) {
        //    template(data, function (error, html) {
        //        if (error) {
        //            console.log(error);
        //        }
        //        else {
        //            self.$el.html(html);
        //        }
        //    });
        //});


    },

    //TODO add the events for this template
    onAddTask: function (e) {
        e.preventDefault();

        return false;
    }

});
