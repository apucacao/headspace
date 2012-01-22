define([
  'underscore', 'jquery', 'backbone', 'models/Links', 'views/App'
], function(_, $, Backbone, LinkCollection, AppView) {

  'use strict';

  var links = window.links = new LinkCollection([], {
    pagination: appData.pagination
  });

  var appView = new AppView({
    el: $('#app'),
    collection: links
    }).render();

  links.reset(appData.links);

});