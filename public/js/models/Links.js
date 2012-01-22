define([
  'underscore', 'backbone', './Link'
], function(_, Backbone, LinkModel) {

  'use strict';

  return Backbone.Collection.extend({
    model: LinkModel,

    perPage: 10,

    page: 1,

    url: function() {
      return '/links/' + (this.starredOnly ? 'starred/' : '');
    },

    initialize: function(models, options) {
      var pagination = (options && options.pagination) || {};
      _.extend(this, pagination);
    },

    comparator: function(model) {
      return -Date.parse(model.get('created_at'));
    },

    gotoPrev: function() {
      if ((this.page - 1) === 0) { return; }
      this.fetch({data: {page: --this.page, perPage: this.perPage}});
    },

    gotoNext: function() {
      if ((this.page + 1) > this.pageCount) { return; }
      this.fetch({data: {page: ++this.page, perPage: this.perPage}});
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

    refresh: function() {
      this.fetch();
    },

    search: function(q) {
      this.page = 1;
      this.q = q;
      this.fetch();
    },

    clearSearch: function() {
      this.q = null;
      this.page = 1;
      return this;
    },

    fetch: function(options) {
      var data = {
        page: this.page,
        perPage: this.perPage
      };

      if (this.q && this.q.length) { data.q = this.q; }

      options || (options = {});

      this.trigger('loading');

      Backbone.Collection.prototype.fetch.call(this, {
        data: data,
        success: function(collection) {
          collection.trigger('done-loading');
        },
        error: function(collection) {
          // can this be more helpful?
          collection.trigger('error-loading');
        }
      });
    },

    parse: function(response) {
      _.extend(this, response.pagination || {});
      return response.links;
    },

    isFiltered: function() {
      return !!(this.q || this.starredOnly || this.page > 1);
    }
  });

});