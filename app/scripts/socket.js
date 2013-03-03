/*global define */

define([
    'io',

], function(io) {
    'use strict';
    var socket = io.connect('http://localhost');
    return socket;
});
