
var template = require('../../../../templates/tasks/tasks.dust');
TaskModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:8000/api/tasks'
});

module.exports = Backbone.View.extend({
    /**
     * @returns {Object}
     */
    events: function () {
        return {
            'click .add-task': 'onAddTask',
            'click .delete-task': 'remTask',
            'click .complete': 'markCompleted',
            'click .taskMembersSubmit': 'collapseTaskMembers',
            'click .memberInputSubmit': 'collapseMemberInput',
            'click .memberRemove': 'removeMember'
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
            success: function (tasks) {
                var helpers = {tasks: _.toArray(tasks.attributes)};
                var userlist = new UserModel();

                userlist.fetch({
                    success: function (users) {
                        helpers.users =  _.toArray(users.attributes);
                        template(helpers, function (error, html) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                self.$el.html(html);
                            }
                        });
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

        //taskDetails.id = taskDetails.title;

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
        console.log(entry);
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
        var self = this;
        var id = e.currentTarget.value;
        var task = new TaskModel({
            id: id
        });
        var newMemberUsername = $('#select-' + id).val();

        task.fetch({
            success: function (task) {
                var members = task.get('members') || [];

                members.push(newMemberUsername);

                task.save({members: _.uniq(members)}, {
                    success: function () {
                        var thisRow = $(e.target).parents('.row.memberInput');
                        thisRow.collapse('toggle');
                        thisRow.siblings('.row.taskMembers').collapse('show');
                        self.render();
                    },
                    failure: function () {
                        console.log('The Command to update: ' + id + ' failed');
                    }
                });
            }
        })

    },

    collapseTaskMembers: function (e) {
        e.preventDefault();
        var thisRow = $(e.target).parents('.row.taskMembers');
        thisRow.collapse('toggle');
        thisRow.siblings('.row.memberInput').collapse('show');
    },

    removeMember: function (e) {
        e.preventDefault();
        var self = this;
        var id = e.currentTarget.parentNode.id;
        var member = e.currentTarget.value;
        var taskToUpdate = new TaskModel({
            id: id
        });

        taskToUpdate.fetch({
            success: function (task) {
                var members = task.get('members') || [];

                taskToUpdate.save({members: _.without(members, member)}, {
                    success: function () {
                        self.render();
                    },
                    failure: function () {
                        console.log('The Command to update: ' + id + ' failed');
                    }
                });
            }
        })
    }
});
