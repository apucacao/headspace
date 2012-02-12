require.config({
  paths: {
    'order'      : 'vendor/require.order-min',
    'text'       : 'vendor/require.text-min',
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
  'underscore', 'json2', 'order!jquery', 'order!backbone',
  'order!lightbox_me', 'order!validate', 'order!timeago'
], function(_) {

  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
  };

  $(function() {
    require({ urlArgs: Date.now() }, ['app']);

    if ('development' in appData) {
      require(['hashgrid']);
    }
  });

});