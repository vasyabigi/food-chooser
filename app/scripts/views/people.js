/*global define */

define([
    'backbone',

    // views
    'views/person',

    // templates
    'text!templates/people.hbs'

], function(Backbone, PersonView, peopleTemplate) {
    'use strict';

    var PeopleView = Backbone.View.extend({
        el: '#content',

        events: {
            'click button': 'createPerson',
            'keypress input': 'createPersonOnEnter',
        },

        initialize: function() {
            this.render();

            this.collection.on('add', this.addPerson, this);
            this.collection.fetch({ update: true });

            // vars from template
            this.$people = this.$('ul');
            this.$nameInput = this.$('input');
        },

        render: function() {
            console.log('----- PeopleView rendered.');
            this.$el.html(peopleTemplate);
            return this;
        },

        createPersonOnEnter: function(e) {
            if(e.which === 13 && !e.shiftKey) {
                this.createPerson();
            }
        },

        createPerson: function() {
            var name = this.$nameInput.val().trim();

            if (name) {
                this.collection.create({
                    name: name
                });

                // Clean name input
                this.$nameInput.val('');
            }

        },

        addPerson: function(model) {
            var personView = new PersonView({ model: model });
            this.$people.append(personView.render().el);
        }
    });

    return PeopleView;
});
