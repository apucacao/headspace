define([
  'underscore', 'jquery', 'backbone', './Link',
  'text!templates/empty-list.html'
], function(_, $, Backbone, LinkView, emptyListTemplate) {

  'use strict';

  return Backbone.View.extend({
    emptyListTemplate: _.template(emptyListTemplate),

    initialize: function() {
      _.bindAll(this, 'render', 'addOne');
      this.collection.bind('add', this.addOne);
      this.collection.bind('refresh', this.render);
      this.collection.bind('reset', this.render);
    },

    render: function() {
      if (this.collection.isEmpty()) {
        this.$el.html(this.emptyListTemplate());
      } else {
        this.$el.html(this.collection.map(function(link) {
          return new LinkView({model: link}).render().el;
        }));
      }
    },

    addOne: function(link) {
      if (!this.collection.isSearch()) {
        this.$el.prepend(new LinkView({model: link}).render().el);
      }
    }
  });

});