define([
  'underscore',
  'jquery',
  'backbone'
],

function(_, $, Backbone) {

  return Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'open', 'close');
      this.collection.on('loading', this.open);
      this.collection.on('done-loading', this.close);
    },

    open: function() {
      this.$el.addClass('loading');
    },

    close: function() {
      this.$el.removeClass('loading');
    }
  });

});