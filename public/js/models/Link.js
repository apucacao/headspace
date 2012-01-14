define([
  'backbone'
], function(Backbone) {

  'use strict';

  return Backbone.Model.extend({
    defaults: {
      starred: false
    },

    toggleStar: function() {
      this.set({starred: !this.get('starred')});
    }
  });

});