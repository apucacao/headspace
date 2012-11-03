require.config({
  deps: ['main'],

  paths: {
    'text'           : 'vendor/require.text',
    'handlebars'     : 'vendor/handlebars-1.0.rc.1',
    'json2'          : 'vendor/json2',
    'underscore'     : 'vendor/underscore',
    'backbone'       : 'vendor/backbone',
    'jquery'         : 'vendor/jquery',
    'jquery.validate': 'vendor/jquery.validate',
    'jquery.timeago' : 'vendor/jquery.timeago',
    'hashgrid'       : 'vendor/hashgrid',
    'template'       : 'template'
  },

  shim: {
    'underscore': {
      exports: '_'
    },

    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },

    'jquery.validate': {
      deps: ['jquery']
    },

    'jquery.timeago': {
      deps: ['jquery']
    },

    'hashgrid': {
      deps: ['jquery']
    }
  }
});