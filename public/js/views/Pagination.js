define([
  'underscore', 'jquery', 'backbone', 'text!templates/pagination.html'
], function(_, $, Backbone, paginationTemplate) {

  'use strict';

  return Backbone.View.extend({
    template: _.template(paginationTemplate),

    events: {
      'click .prev.true': 'prevPage',
      'click .next.true': 'nextPage'
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.collection.bind('reset', this.render);
    },

    render: function() {
      this.$el.removeClass('empty');

      if (this.collection.isEmpty()) {
        this.$el.addClass('empty');
      }

      this.$el.html(this.template({
        prev : !this.collection.firstPage,
        next : !this.collection.lastPage,
        start: this.collection.start,
        end  : this.collection.end,
        total: this.collection.total
      }));
      return this;
    },

    prevPage: function(evt) {
      this.collection.gotoPrev();
    },

    nextPage: function(evt) {
      this.collection.gotoNext();
    },
  });

});