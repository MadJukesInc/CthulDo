'use strict';
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
//Marionette.Renderer.render = function(template, data) {
$(document).ready(function () {
    $('.form-user').submit(function (e) {
        e.preventDefault();
        var data = $('.form-user').serializeArray();
        var result = {};

        _.forEach(data, function forEveryFormData(val) {
            result[val.name] = val.value;
        });
        console.log(result);
        $.post( "/api/users",result, function( data ){
            console.log("Success");
        });
        location.reload();
    });
});
//    var html;
//
//    dust.render(template, data, function(err, out) {
//        html = out;
//    });
//    return html;
//};
//var Controller = Marionette.Controller.extend( {
//
//
//
//} );
//var Router = Marionette.AppRouter.extend( {
//
//    /**
//     * @property    {Object}    appRoutes   Note that the module routes are not
//     *                                      included. Marionette will handle building
//     *                                      the global route table
//     */
//    appRoutes: {
//
//        // the *path is a special formulation that will match any string
//        '*path': 'homePage'
//
//    },
//
//    onRoute: function() {
//        app.regionHeader.show( new HeaderView() );
//    }
//
//} );
//var NavigationView = Backbone.View.extend( {
//
//    /**
//     * @property    {String}    nav     this will be a nav element
//     */
//    tagName: 'ul',
//
//    /**
//     *
//     * @returns {Object}
//     */
//    events: function() {
//        return {
//            'click a': 'onAnchorClick'
//        }
//    },
//
//    /**
//     * @chainable
//     * @returns {Backbone.View}
//     */
//    render: function() {
//
//        var template = _.template( '<li><a href="<%= url %>"><%= label %></a></li>' ),
//            links = [
//                { url: '#', label: 'Home' }
//            ];
//
//        _.each(
//            links,
//            function( link ) {
//                this.$el.append( template( link ) );
//            },
//            this
//        );
//
//        return this;
//    },
//
//
//    /**
//     *
//     * @param   {Event} event
//     * @returns {Boolean}
//     */
//    onAnchorClick: function( event ) {
//        // May not be compatible with older IE versions
//        var href = event.currentTarget.href,
//            hash = '#' + _.last( href.split( '#' ) );
//
//
//
//        // Let Backbone route this for you. Triggering forces
//        // the router to load a new page
//        app.Router.navigate( hash, { trigger: true } );
//
//        // returning false cancels the event
//        return false;
//    }
//
//} );
//var HeaderView = Backbone.View.extend( {
//
//    /**
//     * @property    {String}    tagName
//     */
//    tagName: 'h1',
//
//    /**
//     *
//     * @chainable
//     * @returns {Backbone.View}
//     */
//    render: function() {
//        this.$el.append( 'Marionette Application Example' );
//        return this;
//    }
//} );
//var HomePageView = Backbone.View.extend({
//
//    className: 'users',
//
//    render: function () {
//
//        var User = Backbone.Model.extend({
//            url: "http://localhost:8000/api/users",
//            toJSON: function () {
//
//                return _.clone(this.attributes.response.users);
//            }
//        });
//        var userList = new User();
//
//        userList.fetch();
//        console.log(userList);
//        this.$el.append("home page view");
//        return this;
//    }
//
//});
//
//
//var App = Marionette.Application.extend({
//
//    /**
//     * Define the regions for the application.
//     *
//     * @returns {Object}
//     */
//    regions: function () {
//        return {
//
//            // You can use jquery format to select regions, I'm just using
//            // tagnames for simplicity sake
//            regionHeader: 'header',
//
//            regionNav: 'nav',
//
//            regionMain: 'section'
//
//        };
//    },
//
//    /**
//     *
//     * @param   {Object}    options
//     */
//    start: function (options) {
//        var navigationView = new NavigationView();
//        //console.log(navigationView);
//        // Perform the default 'start' functionality
//        Marionette.Application.prototype.start.apply(this, [options]);
//
//        // Add in the site navigation
//        this.regionNav.show(NavigationView);
//
//        // Add routers
//        this.Router = new Router({controller: new Controller()});
//
//        this.regionMain.show(HomePageView);
//
//
//        // This is a very simple demo, and as such I'm going to use
//        // hashes for internal navigation.  If you want Backbone/Marionette
//        // to enforce full URLs use:
//        // Backbone.history.start( { pushState: true } );
//        Backbone.history.start();
//
//
//    }
//
//});
//var app = new App();
//app.start({});

