define([
  'underscore', 'jquery', 'backbone'
], function(_, $, Backbone) {

  'use strict';

  return Backbone.View.extend({
    events: {
      'submit': 'form',
      'search': 'search'
    },

    initialize: function() {
      _.bindAll(this, 'clear', 'update');
      this.collection.on('clear-filters', this.clear);
      this.collection.on('search', this.update);
    },

    clear: function() {
      this.term = null;
      $('input', this.el).val('');
    },

    update: function(term) {
      $('input', this.el).val(term).focus();
    },

    search: function(evt) {
      evt.preventDefault();

      var newTerm = $('input', this.el).val().trim();

      this.term || (this.term = '');

      if (this.term.length === 0 && newTerm.length === 0) { return; }
      if (this.term === newTerm) { return; }

      if (this.term.length !== 0 && newTerm.length === 0) {
        this.collection.clearSearch().fetch();
        this.term = null;
      } else {
        this.collection.search(newTerm);
        this.term = newTerm;
      }
    },

    form: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });

});