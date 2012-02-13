require.config({
  paths: {
    'order'      : 'vendor/require.order-min',
    'text'       : 'vendor/require.text-min',
    'domReady'   : 'vendor/require.domready-min',
    'json2'      : 'vendor/json2',
    'underscore' : 'vendor/underscore',
    'backbone'   : 'vendor/backbone',
    'jquery'     : 'vendor/jquery-min',
    'validate'   : 'vendor/jquery.validate-min',
    'timeago'    : 'vendor/jquery.timeago',
    'lightbox_me': 'vendor/jquery.lightbox_me',
    'hashgrid'   : 'vendor/hashgrid',
    'templates'  : 'templates'
  }
});

require([
  'domReady', 'jquery', 'order!lightbox_me',
  'order!validate', 'order!timeago'
], function(domReady) {

  domReady(function() {
    require({ urlArgs: Date.now() }, ['app']);

    if ('development' in appData) {
      require(['hashgrid']);
    }
  });

});