require.config({
  deps: ['main'],

  paths: {
    'text'           : 'vendor/require.text',
    'json2'          : 'vendor/json2',
    'underscore'     : 'vendor/underscore',
    'backbone'       : 'vendor/backbone',
    'jquery'         : 'vendor/jquery',
    'jquery.validate': 'vendor/jquery.validate',
    'jquery.timeago' : 'vendor/jquery.timeago',
    'hashgrid'       : 'vendor/hashgrid',
    'templates'      : 'templates'
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