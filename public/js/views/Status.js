define([
  'underscore', 'jquery', 'backbone'
], function(_, $, Backbone) {

  return Backbone.View.extend({
    open: function() {
      $(this.el).addClass('open');
    },

    close: function() {
      $(this.el).removeClass('open');
    }
  });

});