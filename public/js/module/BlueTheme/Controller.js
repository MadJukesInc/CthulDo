var Marionette = require('backbone.marionette'),
    DefaultView = require('./View/Default'),
    KindOfBlueView = require('./View/KindOf');

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
    defaultBlue: function () {
        var defaultView = new DefaultView();
        this.appInstance.regionMain.show(defaultView);
    },


    /**
     * Page to demonstrate intramodule navigation
     */
    kindOfBlue: function () {
        var kindOfBlueView = new KindOfBlueView();
        this.appInstance.regionMain.show(kindOfBlueView);
    }


});
