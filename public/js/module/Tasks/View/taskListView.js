var $ = jQuery = require('jquery');
var _ = require('underscore');
var bootstrap = require('bootstrap');
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
            'submit .add-task': 'onAddTask',
            'click .delete-task': 'remTask',
            'click .complete': 'markCompleted',
            'click .taskMembersSubmit': 'collapseTaskMembers',
            'click .memberInputSubmit': 'collapseMemberInput'
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
                console.log(data);
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
        var self = this;
        var task = new TaskModel();

        _.forEach(formData, function forEveryFormData(val) {
            taskDetails[val.name] = val.value;
        });

        taskDetails.id = taskDetails.title;

        task.save(taskDetails, {
            success: function (task) {
                console.log('Success');
                self.render();
            }
        });

        return false;
    },
    remTask: function (e) {
        e.preventDefault();

        var entry = e.currentTarget.value;
        var task = new TaskModel({
            id: entry,
            completed: false
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
        var completed = e.currentTarget.checked;
        var entry = e.currentTarget.name;
        var task = new TaskModel({
            id: entry
        });
        var self = this;

        task.save({completed: completed}, {
            success: function () {
                self.render();
                $('#tr-' + entry).blur();
            },
            failure: function () {
                console.log('The Command to delete: ' + entry + ' failed');
            }
        });

        return true;
    },

    collapseMemberInput: function (e) {
        e.preventDefault();
        var thisRow = $(e.target).parents('.row.memberInput');
        thisRow.collapse('toggle');
        thisRow.siblings('.row.taskMembers').collapse('show');
    },

    collapseTaskMembers: function (e) {
        e.preventDefault();
        var thisRow = $(e.target).parents('.row.taskMembers');
        thisRow.collapse('toggle');
        thisRow.siblings('.row.memberInput').collapse('show');
    }
});
