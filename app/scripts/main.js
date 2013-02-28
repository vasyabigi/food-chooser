require.config({
    paths: {
        templates: '../templates',
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        lodash: '../components/lodash/lodash',
        backbone: '../components/backbone/backbone',
        handlebars: '../components/handlebars/handlebars',
        text: '../components/requirejs-text/text',
        io: '../components/socket.io/dist/socket.io'
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
        },

        io: {
            exports: 'io'
        }
    }
});

require([
    'app',
    'jquery',
    'ioo',
    'bootstrap',
], function (app, $, ioo) {
    'use strict';

    // use app here
    app.initialize();
    ioo.ioo();
    console.log('Running jQuery %s', $().jquery);
});
