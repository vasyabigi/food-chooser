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
            var that = this;

            // Fetch all foods
            this.listenTo(this.collection, 'add', this.addFood);
            this.listenTo(this.collection, 'change:total', this.changeTotal);
            this.listenTo(this.collection, 'remove', this.changeTotal);

            this.collection.fetch({ update: true, success: function() {
                // Update total after fetching all food
                that.changeTotal();
            } });

            this.listenToFood();
        },

        render: function() {
            this.$el.html(this.template());

            this.$foodTitleInput = this.$('#foodTitle');
            this.$foodPriceInput = this.$('#foodPrice');
            this.$foods = this.$('#foods');
            this.$foodsTotal = this.$('#total');
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

            socket.on('food-updated', function(data) {
                that.collection.update(data.food, { add: false, remove: false });
            });

        },

        changeTotal: function() {
            var total = this.collection.reduce(function(memo, model) { return memo + model.get('total'); }, 0);
            this.$foodsTotal.html(total);
        }

    });

    return FoodView;
});
