({
  appDir : './',
  baseUrl : './',
  optimize : 'uglify',
  dir : '../release',

  paths: {
    'order'       : 'vendor/require.order-min',
    'text'        : 'vendor/require.text-min',
    'domReady'   : 'vendor/require.domready-min',
    'json2'       : 'vendor/json2',
    'underscore' : 'vendor/underscore',
    'backbone'   : 'vendor/backbone',
    'jquery'      : 'vendor/jquery-min',
    'validate'    : 'vendor/jquery.validate-min',
    'timeago'     : 'vendor/jquery.timeago',
    'lightbox_me' : 'vendor/jquery.lightbox_me',
    'templates'  : 'templates'
  },

  modules: [
    {
      name: 'main',
      include: ['app']
    }
  ]
})