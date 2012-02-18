define([
  'underscore', 'jquery', 'backbone', 'text!templates/link.html'
], function(_, $, Backbone, linkTemplate) {

  'use strict';

  return Backbone.View.extend({
    className: 'link',

    template: _.template(linkTemplate),

    events: {
      'click .star:not(.waiting)': 'toggle',
      'click .tag': 'searchByTag'
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('saved', this.render);
    },

    render: function() {
      this.delegateEvents();
      this.$el.html(this.template({
        url: this.model.get('url'),
        note: this.model.get('cleanNote'),
        created_at: this.model.get('created_at'),
        starred: this.model.get('starred'),
        tags: this.model.get('tags')
      }));
      $('.created', this.el).timeago();
      return this;
    },

    toggle: function(evt) {
      evt.preventDefault();
      $('.star', this.el).addClass('waiting');
      this.model.toggle();
    },

    searchByTag: function(evt) {
      var tag = $(evt.target).attr('href');
      evt.preventDefault();
      this.model.collection.search(tag);
    }
  });

});