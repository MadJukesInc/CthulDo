var template = require('../../../../templates/users/users.dust');
UserModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:8000/api/users'
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

        var formData = $('.form-user').serializeArray();
        var userDetails = {};
        var self = this;
        var user = new UserModel();

        _.forEach(formData, function forEveryFormData(val) {
            userDetails[val.name] = val.value;
        });
        //userDetails.id = userDetails.name;

        user.save(userDetails, {
            success: function (user) {
                console.log('Success');
                self.render();
            }
        });

        return false;
    },
    remUser: function(e) {
        e.preventDefault();

        var entry = e.currentTarget.value;
        var user = new UserModel({
            id: entry
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
