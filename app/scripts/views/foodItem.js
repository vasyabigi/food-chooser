/*global define */

define([
    'backbone',
    'handlebars',

    // templates
    'text!templates/foodItem.hbs'
], function(Backbone, Handlebars, foodItemTemplate) {
    'use strict';

    var FoodItemView = Backbone.View.extend({

        tagName: 'tr',

        events: {
            'click i': 'deleteFood'
        },

        template: Handlebars.compile(foodItemTemplate),

        initialize: function() {
            this.listenTo(this.model, 'destroy', this.desroyView);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        deleteFood: function() {
            var r = window.confirm('Are you sire?');
            if (r === true) {
                this.model.destroy();
            }
        },

        desroyView: function() {
            this.undelegateEvents();
            this.remove();
        }
    });

    return FoodItemView;
});
