define([
  'underscore', 'jquery', 'backbone'
], function(_, $, Backbone) {
  
  var delay = 1000;

  return Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'scroll', 'enable', 'refresh');
      this.handler = _.throttle(this.scroll, delay);
      this.enable();
      this.collection.on('reset', this.enable);
      this.collection.on('refresh', this.refresh);
    },

    scroll: function(evt) {
      var scrollTop = $(window).scrollTop();
      var documentHeight = $(document).height();
      var windowHeight=  $(window).height();

      if (scrollTop === documentHeight - windowHeight) {
        if (!this.collection.isComplete()) {
          this.$el.addClass('loading');
          this.collection.more();
        } else {
          this.disable();
        }
      }
    },

    enable: function() {
      this.$el.removeClass('complete').text('');
      $(window).on('scroll', this.handler);
    },

    disable: function() {
      $(window).off('scroll', this.handler);
    },

    refresh: function() {
      this.$el.removeClass('loading');
      if (this.collection.isComplete()) {
        this.$el.addClass('complete').text('All links loaded');
      }
    }
  });

});