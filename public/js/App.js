var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
//Marionette.Renderer.render = function(template, data) {
//    var html;
//
//    dust.render(template, data, function(err, out) {
//        html = out;
//    });
//    return html;
//};
var dust = require('dustjs-linkedin');

//var dust_helpers = require('dustjs-linkedin-helpers');
dust.render('users',{}, function (err, html) {
    console.log(arguments);
})
var Router = require('./Router'),
    Controller = require('./Controller'),
    NavigationView = require('./view/Navigation'),
    BlueThemeModule = require('./module/BlueTheme/Module'),
    UniversalFooter = require('./view/UniversalFooter');

module.exports = Marionette.Application.extend({

    /**
     * Define the regions for the application.
     *
     * @returns {Object}
     */
    regions: function () {
        return {

            // You can use jquery format to select regions, I'm just using
            // tagnames for simplicity sake
            regionHeader: 'header',

            regionNav: 'nav',

            regionMain: 'section',

            regionFooter: 'footer'

        };
    },

    /**
     *
     * @param   {Object}    options
     */
    start: function (options) {
        var navigationView = new NavigationView();

        // Perform the default 'start' functionality
        Marionette.Application.prototype.start.apply(this, [options]);

        // Add in the site navigation
        this.regionNav.show(navigationView);

        // Add routers
        this.Router = new Router({controller: new Controller()});

        // Add modules
        this.module('BlueThemeModule', {moduleClass: BlueThemeModule});

        // This is a very simple demo, and as such I'm going to use
        // hashes for internal navigation.  If you want Backbone/Marionette
        // to enforce full URLs use:
        // Backbone.history.start( { pushState: true } );
        Backbone.history.start();

        // show the footer
        this.regionFooter.show(new UniversalFooter());
    }

});
