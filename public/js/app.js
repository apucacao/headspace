define([
  'underscore', 'jquery', 'backbone', 'models/Links', 'views/App'
], function(_, $, Backbone, LinkCollection, AppView, Paginator) {

  'use strict';

  var links = new LinkCollection();

  var appView = new AppView({
    el: $('#app'),
    collection: links
    }).render();

  links.reset(appData.links);

  if (appData.development) {
    window.links = links;
  }

});