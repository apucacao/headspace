require.config({
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
    'hashgrid'    : 'vendor/hashgrid'
  }
});

require([
  'underscore', 'json2', 'order!jquery', 'order!backbone',
  'order!lightbox_me', 'order!validate', 'order!timeago'
], function(_) {

  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
  };

  require({ urlArgs: Date.now() }, ['app']);

  if (appData.development) {
    require(['hashgrid']);
  }

});