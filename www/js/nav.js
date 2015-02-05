/*global $, DEFAULT_PAGE, auth*/
/*jslint browser: true, unparam: true*/
var nav = (function () {
    'use strict';
    var my = {};
    my.page = '';
    function setPage(e, dest) {
        localStorage.setItem('nav_page', $(dest.toPage).attr('id'));
    }
    my.gotoPage = function (page) {
        my.page = page;
        $(':mobile-pagecontainer').pagecontainer('change', '#' + page);
    };
    my.gotoCurPage = function () {
        var page = '';
        if (my.page && my.page !== 'auth') {
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
        $(window).on('pagechange', setPage);
    };
    return my;
}());

$(document).ready(nav.init);
