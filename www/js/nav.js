/*global $, DEFAULT_PAGE, auth*/
/*jslint browser: true*/
var nav = (function () {
    'use strict';
    var my = {};
    my.page = '';
    my.gotoPage = function (page) {
        my.page = page;
        localStorage.setItem('nav_page', page);
        $(':mobile-pagecontainer').pagecontainer('change', '#' + page);
    };
    my.gotoCurPage = function () {
        var page = '';
        if (my.page) {
            page = my.page;
        } else {
            page = DEFAULT_PAGE;
        }
        my.gotoPage(page);
    };
    my.gotoAuthPage = function () {
        my.gotoPage('auth');
    };
    my.init = function () {
        my.page = localStorage.getItem('nav_page');
        if (auth.token) {
            auth.isTokenValid(
                my.gotoCurPage,
                my.gotoAuthPage
            );
        } else {
            my.gotoPage('auth');
        }
    };
    return my;
}());

$(document).ready(nav.init);
