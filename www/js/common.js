/*global $, $window*/
/*jslint browser: true*/
var common = (function () {
    'use strict';
    var my = {};
    function lostConnection() {
        $.mobile.loading('hide');
    }
    my.init = function () {
        $window.on('offline', lostConnection);
    };
    return my;
}());

$(document).ready(common.init);
