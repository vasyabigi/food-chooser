/*global define */

define([
    'backbone',

    // models
    'models/food'

], function(Backbone, FoodModel) {
    'use strict';

    var FoodCollection = Backbone.Collection.extend({
        model: FoodModel,

        url: '/api/food'
    });

    return FoodCollection;
});
