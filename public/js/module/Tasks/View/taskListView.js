var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var AppInstance;
var template = require('../../../../templates/tasks/tasks.dust');
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
            'click .delete-task': 'remTask',
            'click .complete': 'markCompleted'
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
        var formData = $('.task-form').serializeArray();
        var taskDetails = {};

        _.forEach(formData, function forEveryFormData(val) {
            taskDetails[val.name] = val.value;
        });
        var self = this;

        var task = new TaskModel();
        task.save(taskDetails, {
            success: function (task) {
                console.log('Success');
                //self.render();
            }
        });

        return false;
    },
    remTask: function (e) {
        e.preventDefault();
        var entry = e.currentTarget.value;
        var task = new TaskModel({
            title: entry
        });
        task.destroy({
            success: function () {
                $('#tr-' + entry).remove();

            },
            failure: function () {
                console.log('The Command to delete: ' + entry + ' failed');
            }
        });
        return false;

    },
    markCompleted: function (e) {
        console.log(e);
        var entry = e.currentTarget.value;
        var task = new TaskModel({
            title: entry
        });
        task.set({completed: true}, {
            success: function () {
                //$('#tr-' + entry).remove();
            },
            failure: function () {
                console.log('The Command to delete: ' + entry + ' failed');
            }
        });
        return false;
    }
});
