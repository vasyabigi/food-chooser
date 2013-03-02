/*global define */

define([
    'backbone',

    // views
    'views/index',
    'views/people',

    // collections
    'collections/people'

], function(Backbone, IndexView, PeopleView, PeopleCollection) {
    'use strict';

    var AppRouter = Backbone.Router.extend({

        currentView: null,

        routes: {
            '': 'index',
            'people': 'people'
        },

        changeView: function(view) {
            if ( null !== this.currentView ) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();
        },

        index: function() {
            console.log('index');
            this.changeView(new IndexView());
        },

        people: function() {
            this.changeView(new PeopleView({
                collection: new PeopleCollection()
            }));
        }

    });

    return AppRouter;

});
