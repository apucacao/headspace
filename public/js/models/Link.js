define([
  'backbone'
], function(Backbone) {

  'use strict';

  return Backbone.Model.extend({
    url: function() {
      return '/links/' + (this.id || '');
    },

    defaults: {
      starred: false,
      created_at: new Date(Date.now()).toISOString()
    },

    toggle: function() {
      this.set({starred: !this.get('starred')});
      this.save({}, {
        success: function(model, response) {
          model.trigger('saved', model);
        }
      });
    }
  });

});