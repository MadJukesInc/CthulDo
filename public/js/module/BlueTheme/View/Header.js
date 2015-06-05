var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'h1',

    render: function () {
        this.$el.append('Blue Theme Module');
        return this;
    }

});
