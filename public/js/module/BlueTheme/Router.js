var Marionette = require('backbone.marionette'),
    HeaderView = require('./View/Header'),
    BlueThemeController = require('./Controller'),
    AppInstance;

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        // defaultBlue is a method defined in BlueThemeController
        'blue': 'defaultBlue',

        'blue/kindof': 'kindOfBlue'
    },

    /**
     *
     * @returns {Marionette.Controller}
     */
    _getController: function () {
        return new BlueThemeController();
    },

    /**
     * This is called when the url matches a route in this module
     */
    onRoute: function () {
        // Use this to update the header
        AppInstance = require('../../AppInstance');
        AppInstance.regionHeader.show(new HeaderView());
    }
});
