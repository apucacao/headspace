define([
  'underscore', 'jquery', 'backbone', './Link'
], function(_, $, Backbone, LinkView) {

  'use strict';

  return Backbone.View.extend({
    tagName: 'ol',
    className: 'links',

    initialize: function(options) {
      _.bindAll(this, 'render', 'add');

      this.collection.bind('add', this.add);
      this.collection.bind('reset', this.render);
    },

    render: function() {
      this.el.html(this.collection.map(function(model) {
        return new LinkView({model: model}).render().el;
      }));
      return this;
    },

    add: function(model) {
      this.el.prepend(new LinkView({model: model}).render().el);
    }
  });

});