'use strict';

var UsersModel = function UsersModelConstructor() {
    return [{
        name: 'me',
        createdAt: new Date()
    }, {
        name: 'kyle',
        createdAt: new Date()
    }, {
        name: 'jason',
        createdAt: new Date()
    }];
};

module.exports = UsersModel;
