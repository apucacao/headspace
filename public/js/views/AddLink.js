define([
  'underscore', 'jquery', 'backbone'
], function(_, $, Backbone) {

  'use strict';

  return Backbone.View.extend({
    events: {
      'click .close': 'cancel'
    },

    initialize: function() {
      _.bindAll(this, 'save');

      this.validator = $('form', this.el).validate({
        debug: true,
        rules: {
          url: {
            required: true,
            url: true,
            maxlength: 2083
          },
          note: {
            required: true,
            maxlength: 140
          }
        },
        submitHandler: this.save
      });
    },

    open: function() {
      this.$el.addClass('open');
      $('input', this.el).focus();
    },

    close: function() {
      $('input, textarea', this.el).val('');
      this.validator.resetForm();
      this.$el.removeClass('open');
    },

    save: function() {
      this.collection.create(this.serialize());
      this.close();
    },

    serialize: function() {
      return {
        url: $('#url', this.el).val().trim(),
        note: $('#note', this.el).val().trim(),
        starred: this.collection.isFavorites()
      };
    },

    cancel: function(evt) {
      evt.preventDefault();
      this.close();
    }
  });

});