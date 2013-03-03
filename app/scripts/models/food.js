/*global define */

define([
    'backbone',
], function(Backbone) {
    'use strict';

    var FoodModel = Backbone.Model.extend({
        defaults: {
            'title': 'No title',
            'print': 0
        },

        parse: function( response ) {
            response.id = response._id;
            return response;
        }

    });

    return FoodModel;
});
