/*global $, DEFAULT_PAGE, auth*/
/*jslint browser: true, unparam: true*/
/**
 * Gestion de la navigation
 *
 * @namespace
 * @author    Pierre Rudloff <contact@rudloff.pro>
 * */
var nav = (function () {
    'use strict';
    /**
     * Appelé lors du changement de page, enregistre la page en cours et préviens le module concerné
     *
     * @param {Object} e Événement
     * @param {Object} dest Destination
     *
     * @memberof nav
     * @inner
     * @listens  jQuery:pagecontainerchange
     * */
    function setPage(e, dest) {
        console.log(typeof e, typeof dest);
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
                    nav.gotoPage(DEFAULT_PAGE);
                    location.hash = '#' + DEFAULT_PAGE;
                }
            }
        }
    }
    return {
        page: '',
        gotoPage: function (page) {
            nav.page = page;
            $(':mobile-pagecontainer').pagecontainer('change', '#' + page);
        },
        gotoCurPage: function () {
            var page = '';
            if (nav.page && nav.page !== 'auth') {
                page = nav.page;
            } else {
                page = DEFAULT_PAGE;
            }
            nav.gotoPage(page);
        },
        init: function () {
            nav.page = localStorage.getItem('nav_page');
            //We remove it but it will be set again by the next setPage()
            localStorage.removeItem('nav_page');
            $(':mobile-pagecontainer').on('pagecontainerbeforechange', checkPagechange);
            $(':mobile-pagecontainer').on('pagecontainerchange', setPage);
        }
    };
}());

$(document).ready(nav.init);
