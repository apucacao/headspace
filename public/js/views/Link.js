define([
  'underscore', 'jquery', 'backbone', 'text!templates/Link.html'
], function(_, $, Backbone, linkTemplate) {

  'use strict';

  return Backbone.View.extend({
    tagName: 'li',

    events: {
      'click .star': 'toggleStar'
    },

    initialize: function(options) {
      _.bindAll(this, 'render');
      this.compiledTemplate = _.template(linkTemplate);
      this.model.bind('change', this.render);
    },

    render: function() {
      $(this.el).html(this.compiledTemplate(this.model.toJSON()));
      $('.created', this.el).timeago();
      return this;
    },

    toggleStar: function(ev) {
      ev.preventDefault();
      this.model.toggleStar();
      this.model.save();
    }
  });

});