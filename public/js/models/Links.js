define([
  'backbone', './Link'
], function(Backbone, LinkModel) {

  'use strict';

  var Collection = Backbone.Collection.extend({
    model: LinkModel,
    url: '/links/',

    comparator: function(model) {
      return -Date.parse(model.get('created_at'));
    },

    starred: function() {
      return this.filter(function(link) { return link.get('starred'); });
    }
  });

  return new Collection;

});