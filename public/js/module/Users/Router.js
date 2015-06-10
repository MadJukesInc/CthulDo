var UsersController = require('./Controller');

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        // defaultBlue is a method defined in BlueThemeController
        'users': 'defaultUsers'
    },

    /**
     *
     * @returns {Marionette.Controller}
     */
    _getController: function () {
        return new UsersController();
    },

    /**
     * This is called when the url matches a route in this module
     */
    onRoute: function () {
        // Use this to update the header
        //AppInstance.regionHeader.show(new HeaderView());
    }
});
