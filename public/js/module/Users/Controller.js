var listUsersView = require('./View/listUsersView');

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
    defaultUsers: function () {
        var view = new listUsersView();
        this.appInstance.regionContent.show(view);
    }


});
