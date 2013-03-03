/*global define */

define([
    'backbone',
    'handlebars',

    // templates
    'text!templates/indexPerson.hbs'
], function(Backbone, Handlebars, personTemplate) {
    'use strict';

    var PersonView = Backbone.View.extend({

        tagName: 'td',

        template: Handlebars.compile(personTemplate),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
    });

    return PersonView;
});
