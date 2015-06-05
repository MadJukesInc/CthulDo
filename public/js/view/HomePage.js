
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone.View.extend( {
        
        className: 'home-page-view',
        template: 'users',
        render: function() {
            
            this.$el.append( 'This is the home page view' );
            return this;
        }
        
    } );
