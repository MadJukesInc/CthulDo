var TasksRouter = require('./Router');

module.exports = Marionette.Module.extend({

    initialize: function () {
        // Assign the router
        this.Router = new TasksRouter();
    }

});
