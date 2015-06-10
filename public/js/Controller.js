
var HomePageView = require('./view/HomePage');
var HeaderView = require('./view/Header.js');

module.exports = Marionette.Controller.extend({

    homePage: function () {
        var homePageView = new HomePageView({});

        // update the main section
        AppInstance.regionHeader.show(new HeaderView());
        AppInstance.regionContent.show(homePageView);
    }

});
