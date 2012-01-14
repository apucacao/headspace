define([
  'backbone', 'views/Links'
], function(Backbone, ListListView) {

  'use strict';

  return Backbone.Router.extend({
    routes: {
      'starred'  : 'starred',
      '*default' : 'default'
    },

    default: function() {
      Headspace.views.appView.setView('stream');
    },

    starred: function() {
      Headspace.views.appView.setView('starred');
    }
  });

});