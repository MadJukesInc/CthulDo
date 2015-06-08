var Marionette = require('backbone.marionette'),
    DefaultView = require('./View/Default');

module.exports = Marionette.Controller.extend({

    /**
     * @property    {Marionette.Application}    appInstance
     */
    appInstance: undefined,

    initialize: function () {
        // An example of giving the class an instance of the
        // instantiated application
        this.appInstance = require('../../AppInstance');
    },

    /**
     * default page for the blue module.
     */
    defaultUsers: function () {
        var defaultView = new DefaultView();
        this.appInstance.regionContent.show(defaultView);
    }


});
