var taskListView = require('./View/taskListView');

module.exports = Marionette.Controller.extend({

    /**
     * @property    {Marionette.Application}    appInstance
     */
    appInstance: undefined,

    initialize: function () {
        // An example of giving the class an instance of the
        // instantiated application
        this.appInstance = AppInstance;
    },

    /**
     * default page for the blue module.
     */
    taskListView: function () {
        var view = new taskListView();
        this.appInstance.regionContent.show(view);
    }


});
