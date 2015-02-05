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
    my.submitForm = function (e) {
        if (e.keyCode === 13) {
            $(':mobile-pagecontainer').pagecontainer('getActivePage').find('.submit').click();
        }
    };
    return my;
}());

$(document).ready(common.init);
$(window).keypress(common.submitForm);
