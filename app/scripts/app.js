/*global define */

define([
    'views/index'

], function (indexView) {
    'use strict';

    var initialize = function() {
        indexView.render();
    };

    return {
        'initialize': initialize
    };
});
