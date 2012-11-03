define([
  'underscore', 'jquery', 'backbone', 'model/Links', 'view/App'
], function(_, $, Backbone, LinkCollection, AppView) {

  'use strict';

  return {
    init: function() {
      var links = new LinkCollection();

      var appView = new AppView({
        el: $('#app'),
        collection: links
        }).render();

      links.reset(appData.links);

      if (appData.development) {
        window.links = links;
      }
    }
  }

});