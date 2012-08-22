require([
  'jquery', 'jquery.validate', 'jquery.timeago'
], function($) {

  $(function() {
    require({ urlArgs: Date.now() }, ['app']);

    if ('development' in appData) {
      require(['hashgrid']);
    }
  });

});