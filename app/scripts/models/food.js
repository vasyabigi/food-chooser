/*global define */

define([
    'backbone',
], function(Backbone) {
    'use strict';

    var FoodModel = Backbone.Model.extend({
        defaults: {
            'title': 'No title',
            'print': 0,
            'count': 0,
            'total': 0
        },

        idAttribute: '_id'

    });

    return FoodModel;
});
