'use strict';

var TasksModel = function TasksModelConstructor() {
    return [{
        id: 1,
        title: 'one',
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
        members: [{name: "bob"},{name: "kyle"}],
        owner: 'me'
    }, {
        id: 2,
        title: 'two',
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: true,
        members: [{name:'ONE'},{ name:'TWO' }],
        owner: 'me'
    }];
};


module.exports = TasksModel;
