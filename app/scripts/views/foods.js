/*global define */

define([
    'backbone',
    'handlebars',

    // templates
    'text!templates/foods.hbs',
    // views
    'views/foodItem'

], function(Backbone, Handlebars, foodTemplate, FoodItemView) {
    'use strict';

    var FoodView = Backbone.View.extend({

        template: Handlebars.compile(foodTemplate),

        events: {
            'click button': 'createFood'
        },

        initialize: function() {
            this.listenTo(this.collection, 'add', this.addFood);

            this.collection.fetch({ update: true });
        },

        render: function() {
            this.$el.html(this.template());

            this.$foodTitleInput = this.$('#foodTitle');
            this.$foodPriceInput = this.$('#foodPrice');
            this.$foods = this.$('#foods');
            return this;
        },

        addFood: function(model) {
            var foodItemView = new FoodItemView({ model: model });
            this.$foods.append(foodItemView.render().el);
        },

        createFood: function() {
            this.collection.create({
                'title': this.$foodTitleInput.val(),
                'price': this.$foodPriceInput.val()
            });

            this.$foodTitleInput.val('');
            this.$foodPriceInput.val('');
        }

    });

    return FoodView;
});
