TaskModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:8000/api/tasks'
});

module.exports = Marionette.ItemView.extend({
    template: require('../../../../templates/tasks/tasks.dust'),
    helpers: function (cb) {
        var tasklist = new TaskModel();
        var helpers = {};
        tasklist.fetch({
            success: function (tasks) {
                var taskList = _.toArray(tasks.attributes);
                //_.forEach(taskList, function (task) {
                //    task.owner = getOwnerName(task.owner);
                //});
                helpers = {
                    tasks: taskList,
                    getUserName: function (chunk, context, bodies, params) {
                        var user = new UserModel({id: params.id});
                        return chunk.map(function (chunk) {
                            user.fetch({
                                success: function (user) {
                                    var username = user.get('username');
                                    return chunk.write(username + " (" + params.id + ")").end();

                                },
                                failure: function () {
                                    return chunk.write('ERROR');
                                }
                            })
                        })
                    },
                    isOwner: function (chunk, context, bodies, params) {

                        var userID = Session.get('id');
                        return userID === params.id;

                    }


                };
                var userlist = new UserModel();

                userlist.fetch({
                    success: function (users) {
                        var list = [];
                        _.forEach(users.attributes, function (user) {
                            list.push(user.username);
                        });
                        helpers.users = list;
                        helpers.filteredUsers = function (chunk, context, bodies, params) {
                            return _.difference(this.users, params.members);
                        };
                        cb(null, helpers);

                    }
                }).fail(function (error) {
                    setNotify('danger', error.status + ' ' + error.statusText);
                    cb(error, null);
                });

            }
        }).fail(function (error) {
            setNotify('danger', error.status + ' ' + error.statusText);
        });
    },
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
    }
    ,

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

    }
    ,

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
        }).fail(function (error) {
            setNotify('danger', error.status + ' ' + error.statusText);
        });

        return false;
    }
    ,
    remTask: function (e) {
        e.preventDefault();

        var entry = e.currentTarget.value;
        console.log(entry);
        var task = new TaskModel({
            id: entry
        });

        task.destroy({
            success: function () {
                $('#tr-' + entry).remove();

            }
        }).fail(function (error) {
            setNotify('danger', error.status + ' ' + error.statusText);
        });

        return false;

    }
    ,
    markCompleted: function (e) {
        var completed = e.currentTarget.checked;
        var entry = e.currentTarget.name;
        var task = new TaskModel({
            id: entry
        });
        var self = this;
        task.fetch({
            success: function (task) {
                task.save({completed: completed}, {
                    success: function () {
                        self.render();
                        $('#tr-' + entry).blur();
                        return true;
                    }
                }).fail(function (error) {
                    self.render();
                    setNotify('danger', error.status + ' ' + error.statusText);
                });
            }
        });


    }
    ,

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
                    }
                }).fail(function (error) {
                    var thisRow = $(e.target).parents('.row.memberInput');
                    thisRow.collapse('toggle');
                    thisRow.siblings('.row.taskMembers').collapse('show');
                    setNotify('danger', error.status + ' ' + error.statusText);
                });
            }
        }).fail(function (error) {
            setNotify('danger', error.status + ' ' + error.statusText);
        });

    }
    ,

    collapseTaskMembers: function (e) {
        e.preventDefault();
        var thisRow = $(e.target).parents('.row.taskMembers');
        thisRow.collapse('toggle');
        thisRow.siblings('.row.memberInput').collapse('show');
    }
    ,

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
                    }
                }).fail(function (error) {
                    setNotify('danger', error.status + ' ' + error.statusText);
                });
            }
        }).fail(function (error) {
            setNotify('danger', error.status + ' ' + error.statusText);
        });
    }
})
;
