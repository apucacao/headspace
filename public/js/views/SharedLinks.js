define([
  'underscore', 'jquery', 'backbone', './Link'
], function(_, $, Backbone, LinkView) {

  'use strict';

  return Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      this.collection.bind('reset', this.render);
    },

    render: function() {
      this.$el.html(this.collection.map(function(link) {
        return new LinkView({model: link}).render().el;
      }));
    }
  });

});