define([
  'underscore', 'jquery', 'backbone', 'text!templates/link.html'
], function(_, $, Backbone, linkTemplate) {

  'use strict';

  return Backbone.View.extend({
    className: 'link',

    template: _.template(linkTemplate),

    events: {
      'click .star:not(.waiting)': 'toggle'
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('saved', this.render);
    },

    render: function() {
      this.delegateEvents();
      $(this.el).html(this.template(this.model.toJSON()));
      $('.created', this.el).timeago();
      return this;
    },

    toggle: function(evt) {
      evt.preventDefault();
      $('.star', this.el).addClass('waiting');
      this.model.toggle();
    }
  });

});