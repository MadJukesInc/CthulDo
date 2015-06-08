var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var AppInstance;
var template = require('../../../../templates/users/users.dust');

module.exports = Backbone.View.extend({
    /**
     * @returns {Object}
     */
    events: function () {
        return {
            'submit': 'onAddUser'
        };
    },

    /**
     *
     * @chainable
     * @returns {Backbone.View}
     */

    render: function () {
        //this.$el.empty();
        var self = this;
        $.get("/api/users", function (data) {
            template(data, function (error, html) {
                if (error) {
                    console.log(error);
                }
                else {
                    self.$el.html(html);
                }
            });
        });


    },


    onAddUser: function (e) {
        e.preventDefault();
        var data = $('.form-user').serializeArray();
        var result = {};

        _.forEach(data, function forEveryFormData(val) {
            result[val.name] = val.value;
        });
        var self = this;

        $.post("/api/users", result, function (data) {
            self.render();
        });

        return false;
    }

});
