define([
  'underscore', 'jquery', 'backbone', './LinkList', './StarFilter', './Search',
  './AddLink', './Status', './Pagination', 'hbs!template/app'
], function(_, $, Backbone, LinkListView, StarFilterView, SearchView,
  AddLinkView, StatusView, PaginationView, appTemplate) {

  'use strict';

  return Backbone.View.extend({
    template: appTemplate,

    events: {
      'click #add-link': 'addLink',
      'click #home': 'clear'
    },

    initialize: function() {
      _.bindAll(this, 'loading', 'doneLoading');
      this.collection.bind('loading', this.loading);
      this.collection.bind('done-loading', this.doneLoading);
    },

    loading: function() {
      this.$el.addClass('loading');
    },

    doneLoading: function() {
      this.$el.removeClass('loading');
    },

    addLink: function(evt) {
      evt.preventDefault();
      this.addLinkView.open();
    },

    clear: function(evt) {
      evt.preventDefault();
      this.collection.browseAll();
    },

    render: function() {
      this.$el.html(this.template());

      this.paginationView = new PaginationView({
        el: '#pagination',
        collection: this.collection
      });

      this.statusView = new StatusView({
        el: '#status',
        collection: this.collection
      });

      this.starFilterView = new StarFilterView({
        el: '#star-filter',
        collection: this.collection
      });

      this.searchView = new SearchView({
        el: '#search',
        collection: this.collection
      });

      this.linkListView = new LinkListView({
        el: '#links',
        collection: this.collection
      });

      this.addLinkView = new AddLinkView({
        el: '#dialog',
        collection: this.collection
      });

      return this;
    }
  });

});