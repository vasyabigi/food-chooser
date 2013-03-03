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

            this.receiveFood();
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
            }, {
                wait: true,
                success: function() {
                    socket.emit('food');
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

        receiveFood: function() {
            var that = this;

            socket.on('food', function() {
                that.collection.reset();
                that.$foods.html('');
                that.collection.fetch({ update: true });
            });
        }

    });

    return FoodView;
});
