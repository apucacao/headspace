define([
  'underscore',
  'backbone'
],

function(_, Backbone) {

  'use strict';

  var tagExp = /(^|\s)#([\w\-]+)(?=\s|$)/g;

  return Backbone.Model.extend({
    url: function() {
      return '/api/links/' + (this.id || '');
    },

    defaults: {
      starred: false,
      created_at: new Date(Date.now()).toISOString()
    },

    initialize: function() {
      this.parseTags();
    },

    parseTags: function() {
      var note = this.get('note');
      var tags = [];
      var m;

      var cleanNote = note.replace(tagExp, function(m, pre, tag, post) {
        tags.push(tag);
        return '';
      }).trim();

      tags = _.uniq(tags).sort();

      this.set({
        cleanNote: cleanNote,
        tags: tags
      });
    },

    toggle: function() {
      this.set({starred: !this.get('starred')});
      this.save({}, {
        success: function(model, response) {
          model.trigger('saved', model);
        }
      });
    },

    toJSON: function() {
      var json = Backbone.Model.prototype.toJSON.call(this);
      delete json['cleanNote'];
      delete json['tags'];
      return json;
    }
  });

});
