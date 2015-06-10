var TasksController = require('./Controller');

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        // defaultBlue is a method defined in BlueThemeController
        'tasks': 'taskListView'
    },

    /**
     *
     * @returns {Marionette.Controller}
     */
    _getController: function () {
        return new TasksController();
    },

    /**
     * This is called when the url matches a route in this module
     */
    onRoute: function () {
        // Use this to update the header
        //AppInstance = require('../../AppInstance');
        //AppInstance.regionHeader.show(new HeaderView());
    }
});
