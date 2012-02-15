define([
  'underscore', 'backbone'
], function(_, Backbone) {

  'use strict';

  var tagExp = /\s?#(\w+)\s?/g;

  return Backbone.Model.extend({
    url: function() {
      return '/links/' + (this.id || '');
    },

    defaults: {
      starred: false,
      created_at: new Date(Date.now()).toISOString()
    },

    parseTags: function() {
      var note = this.get('note').replace(tagExp, function(m, tag) { return ''; });
      this.set({note: note}, {silent: true});
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