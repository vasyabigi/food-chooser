/*global define */

define([
    'backbone',
], function(Backbone) {
    'use strict';

    var PersonModel = Backbone.Model.extend({
        defaults: {
            'name': 'Telo'
        }

    });

    return PersonModel;
});
