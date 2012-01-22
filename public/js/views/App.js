define([
  'underscore', 'jquery', 'backbone', './LinkList', './Pagination',
  './StarFilter', './Search', './AddLink', './Status',
  'text!templates/app.html'
], function(_, $, Backbone, LinkListView, PaginationView, StarFilterView,
  SearchView, AddLinkView, StatusView, appTemplate) {

  'use strict';

  return Backbone.View.extend({
    template: _.template(appTemplate),

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
      $(this.el).addClass('loading');
      this.statusView.open();
    },

    doneLoading: function() {
      $(this.el).removeClass('loading');
      this.statusView.close();
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
      $(this.el).html(this.template());

      this.statusView = new StatusView({
        el: '#status',
        collection: this.collection
      });

      this.starFilterView = new StarFilterView({
        el: '#star-filter',
        collection: this.collection
      });

      this.paginationView = new PaginationView({
        el: '#pagination',
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