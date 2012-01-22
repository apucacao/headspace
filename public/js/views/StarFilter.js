define([
  'underscore', 'jquery', 'backbone'
], function(_, $, Backbone) {

  'use strict';

  return Backbone.View.extend({
    events: {
      'click :checkbox': 'toggle'
    },

    initialize: function() {
      _.bindAll(this, 'clear');
      this.toggle = $(':checkbox', this.el);
      this.collection.bind('clear-filters', this.clear);
    },

    toggle: function(evt) {
      var which = this.toggle.is(':checked') ? 'enable' : 'disable';
      this.collection[which + 'StarFilter']().fetch();
    },

    clear: function() {
      $(':checkbox', this.el).removeAttr('checked');
    }
  });

});