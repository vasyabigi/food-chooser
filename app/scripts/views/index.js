/*global define */

define([
    'backbone',
    // templates
    'text!templates/index.hbs',
    // collections
    'collections/people',
    'collections/foods',
    // views
    'views/indexPerson',
    'views/foods'

], function(Backbone, indexTemplate, PeopleCollection, FoodCollection, PersonView, FoodView) {
    'use strict';

    var IndexView = Backbone.View.extend({
        el: '#content',

        initialize: function() {
            this.people = new PeopleCollection();
            this.listenTo(this.people, 'add', this.addPerson);
            this.people.fetch({ update: true });

            this.food = new FoodView({ collection: new FoodCollection() });
        },

        render: function() {
            this.$el.html(indexTemplate);

            this.$('#food').html(this.food.render().el);

            // vars from template
            this.$people = this.$('#people');
        },

        addPerson: function(model) {
            var personView = new PersonView({ model: model });
            this.$people.append(personView.render().el);
        }
    });

    return IndexView;
});
