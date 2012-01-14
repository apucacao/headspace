define([
  './Link', './Links',
], function(LinkView, LinkListView) {

  return LinkListView.extend({
    render: function() {
      this.el.html(this.collection.starred().map(function(model) {
        return new LinkView({model: model}).render().el;
      }));
      return this;
    },

    add: function() {}
  });

});