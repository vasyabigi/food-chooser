/*global define */

define([
    'backbone',

    // models
    'models/person'

], function(Backbone, PersonModel) {
    'use strict';

    var PersonCollection = Backbone.Collection.extend({
        model: PersonModel,

        url: '/api/telo'
    });

    return PersonCollection;
});
