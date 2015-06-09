'use strict';

var TasksModel = function TasksModelConstructor() {
    return [{
        title: 'one',
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
        members: [{name: "bob"},{name: "kyle"}],
        owner: 'me'
    }, {
        title: 'two',
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: true,
        members: [{name:'ONE'},{ name:'TWO' }],
        owner: 'me'
    }];
};


module.exports = TasksModel;
