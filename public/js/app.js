define([
  'underscore', 'jquery', 'backbone', 'models/Links', 'views/App',
  'routers/Workspace'
], function(_, $, Backbone, LinkCollection, AppView, Workspace) {

  'use strict';

  $(function() {

    window.Headspace= window.Headspace || {
      views: {
        appView: new AppView
      },
      routers: {
        workspace: new Workspace
      }
    };

    Backbone.history.start({root: '/'});

    LinkCollection.reset(appData.links);
  });

});