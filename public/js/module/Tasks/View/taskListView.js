var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var AppInstance;
//var template = require('../../../../templates/tasks.dust');
var TaskModel = Backbone.Model.extend({
    url: '/api/tasks'
});
module.exports = Backbone.View.extend({
    /**
     * @returns {Object}
     */
    events: function () {
        return {
            'submit': 'onAddTask',
            'click .delete-task': 'remTask'
        };
    },

    /**
     *
     * @chainable
     * @returns {Backbone.View}
     */

    render: function () {
        this.$el.empty();

        var tasklist = new TaskModel();
        tasklist.fetch({
            success: function (data) {
                template({tasks: _.toArray(data.attributes)}, function (error, html) {
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

    onAddTask: function (e) {
        e.preventDefault();
        var formData = $('.form-task').serializeArray();
        var taskDetails = {};

        _.forEach(formData, function forEveryFormData(val) {
            taskDetails[val.name] = val.value;
        });
        var self = this;

        var task = new TaskModel();
        task.save(taskDetails, {
            success: function (task) {
                console.log('Success');
                self.render();
            }
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
