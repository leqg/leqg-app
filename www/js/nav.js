/*global $, DEFAULT_PAGE, auth*/
/*jslint browser: true, unparam: true*/
var nav = (function () {
    'use strict';
    var my = {};
    my.page = '';
    function setPage(e, dest) {
        var id = $(dest.toPage).attr('id');
        if (localStorage.getItem('nav_page') !== id) {
            if (window[id.split('_')[0]].onnav) {
                window[id.split('_')[0]].onnav(id);
            }
        }
        localStorage.setItem('nav_page', $(dest.toPage).attr('id'));
    }
    function checkPagechange(e, dest) {
        if (typeof dest.toPage !== 'string' && $(dest.toPage).attr('id') === 'auth') {
            if (auth.token) {
                e.preventDefault();
                if (navigator.app && $(':mobile-pagecontainer').pagecontainer('getActivePage').attr('id') === DEFAULT_PAGE) {
                    navigator.app.exitApp();
                } else {
                    my.gotoPage(DEFAULT_PAGE);
                    location.hash = '#' + DEFAULT_PAGE;
                }
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
    my.init = function () {
        my.page = localStorage.getItem('nav_page');
        //We remove it but it will be set again by the next setPage()
        localStorage.removeItem('nav_page');
        $(':mobile-pagecontainer').on('pagecontainerbeforechange', checkPagechange);
        $(':mobile-pagecontainer').on('pagecontainerchange', setPage);
    };
    return my;
}());

$(document).ready(nav.init);
