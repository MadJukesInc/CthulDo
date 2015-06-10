var HeaderView = require('./view/Header.js');


module.exports = Marionette.AppRouter.extend({

    /**
     * @property    {Object}    appRoutes   Note that the module routes are not
     *                                      included. Marionette will handle building
     *                                      the global route table
     */
    appRoutes: {

        // create catchall route for non existent pages
        '*path': 'homePage'

    },

    onRoute: function () {
        AppInstance.regionHeader.show(new HeaderView());
    }

});
