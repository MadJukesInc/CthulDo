'use strict';

var Sequelize = require('sequelize');
var driver = new Sequelize('todo_test', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
var User = driver.define('users', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            unique: true
        }
    }
);
var Task = driver.define('tasks', {
    title: {
        type: Sequelize.STRING,
        unique: 'compositeIndex'
    },
    completed: {
        type: Sequelize.BOOLEAN
    },
    members: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: Sequelize.ARRAY
    },
    owner: {
        type: Sequelize.STRING,
        unique: 'compositeIndex',
        references: {
            model: User,
            key: 'name'
        }
    }
});

//driver.sync({force: true});
//User.sync({force: true}).then(function () {
//    return User.create({name: "Kyle Pineau"});
//});
//console.log(User.all());


var db = function spec() {
    return {
        getUsers: function (cb) {
            return User.all().then(function (result) {
                cb(null, result);
            });
        },
        postUsers: function (user, cb) {
            User.create(user).then(function (err,result) {
                console.log("error" + err +' : ' + result)
                cb(err, result);
            });
        },
        getTasks: function (cb) {
            return Task.findAll({where: {owner: currentUser}});
        },
        getTask: function (id, cb) {
            return Task.findOne({
                where: {id: id}
            })
        },
        postTasks: function (task) {
            Task.create(task);
        },
        putTask: function (id, task) {
            Task.update(task,
                {
                    where: {
                        compositeIndex: id
                    }
                }
            )
        },
        patchTask: function (id, task) {
            Task.update(task,
                {
                    where: {
                        compositeIndex: id
                    }
                }
            )
        },
        deleteTask: function (id) {
            Task.destroy(
                {
                    where: {
                        compositeIndex: id
                    }
                }
            );
        }
    }
};

module.exports = db();