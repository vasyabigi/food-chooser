/*global define */

define([
    'backbone',
], function(Backbone) {
    'use strict';

    var PersonModel = Backbone.Model.extend({
        defaults: {
            'name': 'Telo'
        },

        parse: function( response ) {
            response.id = response._id;
            return response;
        }

    });

    return PersonModel;
});
