({
  appDir : './',
  baseUrl : './',
  optimize : 'uglify',
  dir : '../release',

  paths: {
    'order'       : 'vendor/require.order-min',
    'text'        : 'vendor/require.text-min',
    'json2'       : 'vendor/json2',
    'underscore'  : 'vendor/underscore-min',
    'backbone'    : 'vendor/AMDbackbone-0.5.3',
    'jquery'      : 'vendor/jquery-min',
    'validate'    : 'vendor/jquery.validate-min',
    'timeago'     : 'vendor/jquery.timeago',
    'lightbox_me' : 'vendor/jquery.lightbox_me',
  },

  modules: [
    {
      name : 'main',
      exclude : []
    }
  ]
})