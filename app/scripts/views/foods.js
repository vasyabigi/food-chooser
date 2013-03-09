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
            'keypress #newFood': 'createFoodOnEnter',
            'click #saveFood': 'saveFood',
            'keypress #editFood': 'saveFoodOnEnter'
        },

        initialize: function() {
            var that = this;

            this.listenTo(this.collection, 'add', this.addFood);
            this.listenTo(this.collection, 'change:total', this.changeTotal);
            this.listenTo(this.collection, 'remove', this.changeTotal);
            this.listenTo(this.collection, 'editFood', this.editFood);

            this.collection.fetch({ update: true, success: function() {
                // Update total after fetching all food
                that.changeTotal();
            } });

            this.listenToFood();
        },

        render: function() {
            this.$el.html(this.template());

            // vars from template
            this.$foodTitleInput = this.$('#foodTitle');
            this.$foodPriceInput = this.$('#foodPrice');
            this.$foods = this.$('#foods');
            this.$foodsTotal = this.$('#total');

            // Modal vars
            this.$foodModal = this.$('#editFood');
            this.$foodModalTitle = this.$('#editFoodTitle');
            this.$foodModalPrice = this.$('#editFoodPrice');

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
        },

        editFood: function(model) {
            this.editedModel = model;

            this.$foodModalTitle.val(model.get('title'));
            this.$foodModalPrice.val(model.get('price'));
            this.$foodModal.modal('show');
        },

        saveFood: function() {
            // TODO: Validation
            if (this.$foodModalTitle.val() === '') {
                this.$foodModalTitle.focus();
                return;
            }

            if (this.$foodModalPrice.val() === '') {
                this.$foodModalPrice.focus();
                return;
            }

            this.editedModel.set({
                'title': this.$foodModalTitle.val(),
                'price': this.$foodModalPrice.val()
            });

            this.$foodModal.modal('hide');
        },

        saveFoodOnEnter: function(e) {
            if(e.which === 13 && !e.shiftKey) {
                this.saveFood();
            }
        }

    });

    return FoodView;
});
