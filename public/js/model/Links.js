define([
  'underscore',
  'backbone',
  './Link'
],

function(_, Backbone, LinkModel) {

  'use strict';

  return Backbone.Collection.extend({
    model: LinkModel,

    page: 1,

    url: function() {
      return '/api/links/' + (this.starredOnly ? 'starred/' : '');
    },

    comparator: function(model) {
      return -Date.parse(model.get('created_at'));
    },

    enableStarFilter: function() {
      this.page = 1;
      this.starredOnly = true;
      return this;
    },

    disableStarFilter: function() {
      this.page = 1;
      this.starredOnly = false;
      return this;
    },

    browseAll: function() {
      this.page = 1;
      this.q = null;
      this.starredOnly = false;
      this.trigger('clear-filters');
      this.fetch();
    },

    search: function(q) {
      this.page = 1;
      this.q = q;
      this.trigger('search', this.q);
      this.fetch();
    },

    clearSearch: function() {
      this.q = null;
      this.page = 1;
      return this;
    },

    more: function() {
      this.page += 1;
      this.fetch({add: true});
    },

    fetch: function(options) {
      var self = this;
      var data = {};

      if (this.page > 1) { data.page = this.page; }
      if (this.q && this.q.length) { data.q = this.q; }

      options || (options = {});

      this.trigger('loading');

      Backbone.Collection.prototype.fetch.call(this, _.extend(options, {
        data: data,
        success: function(collection) {
          collection.trigger('done-loading');
          if (options.add === true) { self.trigger('refresh'); }
        },
        error: function(collection) {
          collection.trigger('error-loading', {message: 'Error loading links'});
        }
      }));
    },

    parse: function(response) {
      this.complete = response.length === 0;
      return response;
    },

    isComplete: function() {
      return this.complete;
    },

    isFiltered: function() {
      return !!(this.q || this.starredOnly);
    },

    isFavorites: function() {
      return !!this.starredOnly;
    },

    isSearch: function() {
      !!this.q;
    }
  });

});
