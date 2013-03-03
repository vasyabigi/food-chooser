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
    'jquery',
    'backbone',
    'router',
    'ioo',
], function ($, Backbone, Router, ioo) {
    'use strict';

    ioo.ioo();

    new Router();

    Backbone.history.start({pushState: true});

    // Copypaste from backbone bbb
    $(document).on('click', 'a[href]:not([data-bypass])', function(evt) {
        // Get the absolute anchor href.
        var href = { prop: $(this).prop('href'), attr: $(this).attr('href') };
        // Get the absolute root.
        var root = location.protocol + '//' + location.host + '/';

        // Ensure the root is part of the anchor href, meaning it's relative.
        if (href.prop.slice(0, root.length) === root) {
            // Stop the default event to ensure the link will not cause a page
            // refresh.
            evt.preventDefault();

            // `Backbone.history.navigate` is sufficient for all Routers and will
            // trigger the correct events. The Router's internal `navigate` method
            // calls this anyways.  The fragment is sliced from the root.
            Backbone.history.navigate(href.attr, true);
        }
    });

});
