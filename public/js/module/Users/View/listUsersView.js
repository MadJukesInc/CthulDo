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
    template: require('../../../../templates/users/users.dust'),
    helpers: function (cb) {
        var helpers = {};
        var userlist = new UserModel();
        userlist.fetch({
            success: function (data) {
                helpers.users =  _.toArray(data.attributes);
                cb(null, helpers);
            }
        }).fail(function (error) {
            setNotify('danger', error.status + ' ' + error.statusText);
            cb(error,null);
        });
    },
    /**
     *
     * @chainable
     * @returns {Backbone.View}
     */

    render: function () {
        var self = this;
        this.helpers(function (err, helpers) {
            self.template(helpers, function (error, html) {
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
        }).fail(function (error) {
            setNotify('danger', error.status + ' ' + error.statusText);
        });

        return false;
    },
    remUser: function (e) {
        e.preventDefault();

        var entry = e.currentTarget.value;
        var user = new UserModel({
            id: entry
        });

        user.destroy({
            success: function () {
                $('#tr-' + entry).remove();

            },
            failure: function () {
                console.log('The Command to delete: ' + entry + ' failed');
            }
        });

        return false;

    }

});
