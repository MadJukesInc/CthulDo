var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var AppInstance;
var template = require('../../../../templates/users/users.dust');
var UserModel = Backbone.Model.extend({
    url: '/api/users'
});

module.exports = Backbone.View.extend({
    /**
     * @returns {Object}
     */
    events: function () {
        return {
            'submit': 'onAddUser',
            'click .delete-user': 'remUser'
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
        var userlist = new UserModel();
        userlist.fetch({
            success: function (data) {
                template({users: _.toArray(data.attributes)}, function (error, html) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        self.$el.html(html);
                    }
                });
            }
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
    },
    remUser: function(e) {
        e.preventDefault();
        console.log(e);
        var entry = e.currentTarget.value;
        var user = new UserModel({
            name: entry
        });
        user.destroy({
            success: function () {
                $('#tr-'+entry).remove();

            },
            failure: function () {
                console.log('The Command to delete: ' + entry + ' failed');
            }
        });
        return false;

    }

});
