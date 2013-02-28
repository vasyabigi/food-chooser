require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        lodash: '../components/lodash/lodash',
        backbone: '../components/backbone/backbone',
        handlebars: '../components/handlebars/handlebars',
        text: '../components/requirejs-text/text',
        templates: '../templates'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },

        lodash: {
            exports: '_'
        },

        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },

        handlebars: {
            exports: 'Handlebars'
        }
    }
});

require([
    'app',
    'jquery',
    'bootstrap'
], function (app, $) {
    'use strict';

    // use app here
    app.initialize();
    console.log('Running jQuery %s', $().jquery);
});
