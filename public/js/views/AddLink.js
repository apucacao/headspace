define([
  'underscore', 'jquery', 'backbone'
], function(_, $, Backbone) {

  return Backbone.View.extend({
    el: $('#add-link'),

    initialize: function(options) {
      _.bindAll(this, 'save', 'onLoad', 'onClose');

      this.form = $('form', this.el);

      this.form.validate({
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

      this.el.lightbox_me({
        centered : true,
        onLoad   : this.onLoad,
        onClose  : this.onClose
      });
    },

    save: function() {
      this.collection.create(this.serialize());
      this.el.trigger('close');
    },

    serialize: function() {
      return {
        url: $('#url', this.el).val(),
        note: $('#note', this.el).val()
      };
    },

    onLoad: function() {
      $('input', this.form).first().focus();
    },

    onClose: function() {
      $('input, textarea', this.form).val('');
    }
  });

});