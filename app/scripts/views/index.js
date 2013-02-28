/*global define */

define([
    'backbone',
    // templates
    'text!templates/index.hbs'

], function(Backbone, indexTemplate) {
    'use strict';

    var IndexView = Backbone.View.extend({
        el: '#content',

        render: function() {
            this.$el.html(indexTemplate);
            return this;
        }
    });

    return new IndexView();
});
