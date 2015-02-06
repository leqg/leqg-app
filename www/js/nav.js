/*global $, DEFAULT_PAGE, auth*/
/*jslint browser: true, unparam: true*/
var nav = (function () {
    'use strict';
    var my = {};
    my.page = '';
    function setPage(e, dest) {
        localStorage.setItem('nav_page', $(dest.toPage).attr('id'));
    }
    function checkPagechange(e, dest) {
        if (typeof dest.toPage !== 'string' && $(dest.toPage).attr('id') === 'auth') {
            if (auth.token) {
                my.gotoPage(DEFAULT_PAGE);
                location.hash = '#' + DEFAULT_PAGE;
                e.preventDefault();
            }
        }
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
                auth.logout
            );
        } else {
            my.gotoPage('auth');
        }
        $(':mobile-pagecontainer').on('pagecontainerbeforechange', checkPagechange);
        $(':mobile-pagecontainer').on('pagecontainerchange', setPage);
    };
    return my;
}());

$(document).ready(nav.init);
