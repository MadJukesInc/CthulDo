var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var AppInstance;


module.exports = Backbone.View.extend({

    template: '../../../users',
    /**
     * @returns {Object}
     */
    events: function () {
        return {
            'click a': 'onLinkClick'
        };
    },

    /**
     *
     * @chainable
     * @returns {Backbone.View}
     */

    render: function () {

        var User = Backbone.Model.extend({
            url: "http://localhost:8000/api/users",
            toJSON: function () {

                return _.clone(this.attributes.response.users);
            }
        });
        var userList = new User();
        var self = this;
        userList.fetch(function (err, data) {
            console.log(err);
            self.$el.append(err.attributes.users[0].name)
            return self;
        });



    },


    onLinkClick: function () {

        AppInstance = require('../../../AppInstance');

        AppInstance.Router.navigate('#blue/kindof', {trigger: true});

        // Returning false kills the jQuery event
        return false;
    }

});
