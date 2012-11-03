define([
  'underscore', 'jquery', 'backbone', './Link',
  'hbs!template/empty-list'
], function(_, $, Backbone, LinkView, emptyListTemplate) {

  'use strict';

  return Backbone.View.extend({
    emptyListTemplate: emptyListTemplate,

    initialize: function() {
      _.bindAll(this, 'render', 'addOne');
      this.collection.on('add', this.addOne);
      this.collection.on('refresh', this.render);
      this.collection.on('reset', this.render);
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
      if (this.collection.isSearch()) { return; }
      if (this.collection.size() === 1) {
        this.render();
      } else {
        this.$el.prepend(new LinkView({model: link}).render().el);
      }
    }
  });

});