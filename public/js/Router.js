var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var HeaderView = require('./view/Header.js');
var AppInstance;

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
        AppInstance = require('./AppInstance');
        AppInstance.regionHeader.show(new HeaderView());
    }

});
