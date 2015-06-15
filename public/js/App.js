$ = jQuery = require('jquery');
_ = require('underscore');
bootstrap = require('bootstrap');
Backbone = require('backbone');
Backbone.$ = $;
Marionette = require('backbone.marionette');
Session = require('./Session');

var Router = require('./Router'),
    Controller = require('./Controller'),
    UserModule = require('./module/Users/Module'),
    TasksModule = require('./module/Tasks/Module'),
    HeaderView = require('./view/Header.js');

setNotify = function (type, message) {
    AppInstance.regionNotify.$el.html('<div class="alert alert-' + type + '" role="alert">' + message + '</div>');
    window.setTimeout(function () {  AppInstance.regionNotify.$el.html('') }, 2000);
};

module.exports = Marionette.Application.extend({

    /**
     * Define the regions for the application.
     *
     * @returns {Object}
     */
    regions: function () {
        return {
            regionNotify: ".notifications",
            regionHeader: ".header",
            regionContent: ".content",
            regionFooter: ".footer",
            regionSidebar: ".sidebar"
        };
    },

    /**
     *
     * @param   {Object}    options
     */
    start: function (options) {
        //var navigationView = new NavigationView();

        // show the footer
        //this.regionFooter.show(new UniversalFooter());
        // Perform the default 'start' functionality
        Marionette.Application.prototype.start.apply(this, [options]);

        // Add routers
        this.Router = new Router({controller: new Controller()});

        // Add modules
        this.module('UserModule', {moduleClass: UserModule});
        this.module('TasksModule', {moduleClass: TasksModule});

        // This is a very simple demo, and as such I'm going to use
        // hashes for internal navigation.  If you want Backbone/Marionette
        // to enforce full URLs use:
        // Backbone.history.start( { pushState: true } );

        Backbone.history.start();
        this.regionHeader.show(new HeaderView());

    }

});
