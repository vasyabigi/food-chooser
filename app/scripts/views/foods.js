/*global define */

define([
    'socket',
    'backbone',
    'handlebars',

    // templates
    'text!templates/foods.hbs',
    // views
    'views/foodItem'

], function(socket, Backbone, Handlebars, foodTemplate, FoodItemView) {
    'use strict';

    var FoodView = Backbone.View.extend({

        template: Handlebars.compile(foodTemplate),

        events: {
            'click button': 'createFood',
            'keypress input': 'createFoodOnEnter',
        },

        initialize: function() {
            // Fetch all foods
            this.listenTo(this.collection, 'add', this.addFood);
            this.collection.fetch({ update: true });

            this.listenToFood();
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

            // TODO: Validation
            if (this.$foodTitleInput.val() === '') {
                this.$foodTitleInput.focus();
                return;
            }

            if (this.$foodPriceInput.val() === '') {
                this.$foodPriceInput.focus();
                return;
            }

            this.collection.create({
                'title': this.$foodTitleInput.val(),
                'price': this.$foodPriceInput.val()
            }, {
                wait: true,
                success: function(model) {
                    socket.emit('food-created', { 'id': model.id });
                }
            });

            this.$foodTitleInput.val('');
            this.$foodPriceInput.val('');
        },

        createFoodOnEnter: function(e) {
            if(e.which === 13 && !e.shiftKey) {
                this.createFood();
            }
        },

        listenToFood: function() {
            var that = this;

            socket.on('food-created', function(data) {
                that.collection.add(data.food);
            });

            socket.on('food-deleted', function(data) {
                that.collection.remove(data.id);
            });
        }

    });

    return FoodView;
});
