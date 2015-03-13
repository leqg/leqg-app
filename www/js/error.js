/*global $*/
/*jslint browser: true*/
/**
 * @namespace
 * */
var error = (function () {
    'use strict';
    var $error;
    /**
     * @scope error
     * */
    return {
        display: function (msg) {
            $('#error_msg').text(msg);
            $error.popup('open');
        },
        init: function () {
            $error = $('#error');
            $error.enhanceWithin().popup();
        }
    };
}());

$(document).ready(error.init);
