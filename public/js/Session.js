var SessionModel = Backbone.Model.extend({

    urlRoot: '/session',
    initialize: function () {
        var that = this;
        // Hook into jquery
        // Use withCredentials to send the server cookies
        // The server must allow this through response headers
        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            options.xhrFields = {
                withCredentials: true
            };
            // If we have a csrf token send it through with the next request
            if(typeof that.get('_csrf') !== 'undefined') {
                jqXHR.setRequestHeader('X-CSRF-Token', that.get('_csrf'));
            }
        });
    },
    getAuth: function(callback) {
        // getAuth is wrapped around our router
        // before we start any routers let us see if the user is valid
        this.fetch({
            success: callback
        });
    }
});
module.exports = new SessionModel();
