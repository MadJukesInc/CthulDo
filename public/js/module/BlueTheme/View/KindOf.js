var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    render: function () {
        this.$el.append('<h2>Kind of Blue View</h2>');
        return this;
    }

});
