/*global define */

define([
    'io',
    'backbone',
    // templates
    'text!templates/index.hbs',
    // collections
    'collections/people',
    'collections/foods',
    // views
    'views/indexPerson',
    'views/foods'

], function(io, Backbone, indexTemplate, PeopleCollection, FoodCollection, PersonView, FoodView) {
    'use strict';

    var IndexView = Backbone.View.extend({
        el: '#content',

        initialize: function() {
            this.render();

            this.socket = io.connect('http://localhost');

            // People
            this.people = new PeopleCollection();
            this.listenTo(this.people, 'add', this.addPerson);
            this.people.fetch({ update: true });

            // Food
            this.food = new FoodView({ collection: new FoodCollection() });
            this.$('#food').html(this.food.render().el);

            // vars from template
            this.$people = this.$('#people');
            this.$online = this.$('#online');

            console.log(this.$online);

            // Count of online users
            this.onlineCount = 0;

            this.updateOnlineCount();
        },

        render: function() {
            this.$el.html(indexTemplate);
        },

        addPerson: function(model) {
            var personView = new PersonView({ model: model });
            this.$people.append(personView.render().el);
        },

        updateOnlineCount: function() {
            var that = this;
            this.socket.on('online', function (data) {
                if (that.onlineCount !== data.number) {
                    that.onlineCount = data.number;
                    that.$online.html(that.onlineCount);
                }
            });
        }
    });

    return IndexView;
});
