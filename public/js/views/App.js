define([
  'underscore', 'jquery', 'backbone', 'models/Links', './Links',
  './StarredLinks', './AddLink'
], function(_, $, Backbone, LinkCollection, LinkListView, StarredListView,
  AddLinkView) {

  'use strict';

  return Backbone.View.extend({
    el: $('#app'),

    events: {
      'click .add-link' : 'addLink'
    },

    transitions: {
      fadeIn: function(callback) { $(this.el).fadeIn('fast', callback || $.noop); },
      fadeOut: function(callback) { $(this.el).fadeOut('fast', callback || $.noop); }
    },

    initialize: function() {
      this.streamView = new LinkListView({el: $('#stream'), collection: LinkCollection});
      this.starredView = new StarredListView({el: $('#starred'), collection: LinkCollection});
    },

    setView: function(name) {
      switch(name) {
        case 'stream':
          this.hide(this.starredView, _.bind(function() {
            this.show(this.streamView);
          }, this));
          break;
          case 'starred':
          this.hide(this.streamView, _.bind(function() {
            this.show(this.starredView);
          }, this));
          break;
      }
    },

    show: function(view, callback) {
      this.transitions.fadeIn.call(view.render(), callback);
    },

    hide: function(view, callback) {
      this.transitions.fadeOut.call(view.render(), callback);
    },

    addLink: function(ev) {
      ev.preventDefault();
      new AddLinkView({collection: LinkCollection});
    }
  });

});