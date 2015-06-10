
module.exports = Backbone.View.extend({

    /**
     *
     * @chainable
     * @returns {Backbone.View}
     */
    render: function () {
        var template = require('../../templates/layouts/header.dust');
        var self = this;
        Session.fetch({
            success: function() {
                var helper = Session.attributes;

                template(helper, function (err, html) {
                    self.$el.append(html);
                });
                return this;
            }
        });

    }
});
