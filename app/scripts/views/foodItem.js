/*global define */

define([
    'socket',
    'backbone',
    'handlebars',

    // templates
    'text!templates/foodItem.hbs'
], function(socket, Backbone, Handlebars, foodItemTemplate) {
    'use strict';

    var FoodItemView = Backbone.View.extend({

        tagName: 'tr',

        events: {
            'click i': 'deleteFood',
            'change .count': 'changeCount'
        },

        template: Handlebars.compile(foodItemTemplate),

        initialize: function() {
            this.listenTo(this.model, 'destroy', this.desroyView);
            this.listenTo(this.model, 'remove', this.desroyView);
            this.listenTo(this.model, 'change:count', this.changeTotal);
            this.listenTo(this.model, 'change:total', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        deleteFood: function() {
            var r = window.confirm('Are you sure?');
            if (r === true) {
                this.model.destroy({ wait: true, success: function(model) {
                        socket.emit('food-deleted', { 'id': model.id });
                    }
                });
            }
        },

        desroyView: function() {
            this.undelegateEvents();
            this.remove();
        },

        changeCount: function() {
            var count = parseInt(this.$('.count').val(), 10);
            this.model.set('count', count);
        },

        changeTotal: function() {
            this.model.set('total', this.model.get('count') * this.model.get('price'));
            this.model.save(null, { success: function(model) {
                socket.emit('food-updated', { 'id': model.id });
            }});
        }
    });

    return FoodItemView;
});
