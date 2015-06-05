var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var    HomePageView = require('./view/HomePage');

module.exports = Marionette.Controller.extend({

    homePage: function () {
        var AppInstance = require('./AppInstance'),
            homePageView = new HomePageView({});

        // update the main section
        AppInstance.regionMain.show(homePageView);
    }

});
