define([
  'underscore', 'jquery', 'backbone'
], function(_, $, Backbone) {

  var delay = 750;
  var threshold = 350;

  return Backbone.View.extend({
    events: {
      'click .load-more': 'force'
    },

    initialize: function() {
      _.bindAll(this, 'scroll', 'enable', 'refresh');

      this.handler = _.throttle(this.scroll, delay);
      this.message = this.$el.find('.message');
      this.action = this.$el.find('.load-more');

      this.refresh();

      this.collection.on('reset', this.refresh);
      this.collection.on('refresh', this.refresh);
    },

    scroll: function(evt) {
      var scrollTop = $(window).scrollTop();
      var documentHeight = $(document).height();
      var windowHeight =  $(window).height();

      if (scrollTop >= (documentHeight - windowHeight - threshold)) {
        if (!this.collection.isComplete()) {
          this.loadMore();
        } else {
          this.disable();
        }
      }
    },

    force: function(evt) {
      evt.preventDefault();
      this.loadMore();
    },

    loadMore: function() {
      this.$el.addClass('loading');
      this.collection.more();
    },

    enable: function() {
      $(window).on('scroll', this.handler);
    },

    disable: function() {
      $(window).off('scroll', this.handler);
    },

    refresh: function() {
      var documentHeight = $(document).height();
      var windowHeight =  $(window).height();

      this.$el.removeClass('loading');

      if (this.collection.isComplete()) {
        this.$el.addClass('complete');
      } else {
        this.$el.removeClass('complete');
        if (documentHeight > windowHeight) {
          this.$el.addClass('auto');
          this.enable();
        }
      }
    }
  });

});