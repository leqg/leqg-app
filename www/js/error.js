/*global $*/
/*jslint browser: true*/
var error = (function () {
    'use strict';
    var my = {},
        $error;
    my.display = function (msg) {
        $('#error_msg').text(msg);
        $error.popup('open');
    };
    my.init = function () {
        $error = $('#error');
        $error.enhanceWithin().popup();
    };
    return my;
}());

$(document).ready(error.init);
