/*global define */

define([
    'backbone',
    // templates
    'text!templates/people.hbs'

], function(Backbone, peopleTemplate) {
    'use strict';

    var PeopleView = Backbone.View.extend({
        el: '#content',

        render: function() {
            this.$el.html(peopleTemplate);
            return this;
        }
    });

    return PeopleView;
});
