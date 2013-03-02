/*global define */

define([
    'backbone',
    // templates
    'text!templates/index.hbs',
    // collections
    'collections/people',
    // views
    'views/indexPerson'

], function(Backbone, indexTemplate, PeopleCollection, PersonView) {
    'use strict';

    var IndexView = Backbone.View.extend({
        el: '#content',

        initialize: function() {
            this.people = new PeopleCollection();
            this.listenTo(this.people, 'add', this.addPerson);
            this.people.fetch({ update: true });
        },

        render: function() {
            this.$el.html(indexTemplate);

            // vars from template
            this.$people = this.$('ul');
            return this;
        },

        addPerson: function(model) {
            var personView = new PersonView({ model: model });
            this.$people.append(personView.render().el);
        }
    });

    return IndexView;
});
