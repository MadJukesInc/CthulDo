var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var HeaderView = require('./view/Header');
var AppInstance;

module.exports = Marionette.AppRouter.extend({

    /**
     * @property    {Object}    appRoutes   Note that the module routes are not
     *                                      included. Marionette will handle building
     *                                      the global route table
     */
    appRoutes: {

        // the *path is a special formulation that will match any string
        '*path': 'homePage'

    },

    onRoute: function () {
        AppInstance = require('./AppInstance');
        AppInstance.regionHeader.show(new HeaderView());
    }

});
