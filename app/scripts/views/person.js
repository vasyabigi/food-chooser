/*global define */

define([
    'backbone',
    'handlebars',

    // templates
    'text!templates/person.hbs'
], function(Backbone, Handlebars, personTemplate) {
    'use strict';

    var PersonView = Backbone.View.extend({

        tagName: 'li',

        events: {
            'mouseover': 'showCloseIcon',
            'mouseout': 'hideCloseIcon',
            'click i': 'deletePerson'
        },

        template: Handlebars.compile(personTemplate),

        initialize: function() {
            this.model.on('destroy', this.desroyView, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            this.$closeIcon = this.$('.icon-remove-circle');

            return this;
        },

        showCloseIcon: function() {
            this.$closeIcon.show();
        },

        hideCloseIcon: function() {
            this.$closeIcon.hide();
        },

        deletePerson: function() {
            this.model.destroy();
        },

        desroyView: function() {
            this.undelegateEvents();
            this.remove();
        }
    });

    return PersonView;
});
