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
     * Enregistre la page en cours et prévient le module concerné
     *
     * @param {Object} e Événement
     * @param {Object} dest Destination
     *
     * @memberof nav
     * @inner
     * */
    function setPage(e, dest) {
        var id = $(dest.toPage).attr('id');
        if (localStorage.getItem('nav_page') !== id) {
            if (window[id.split('_')[0]].onnav) {
                window[id.split('_')[0]].onnav(id);
            }
        }
        localStorage.setItem('nav_page', $(dest.toPage).attr('id'));
    }
    /**
     * Vérifie si la page a changé
     *
     * @param {Object} e Événement
     * @param {Object} dest Destination
     *
     * @memberof nav
     * @inner
     * */
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
        /**
         * Identifiant de la page en cours
         * @type string
         * @memberof nav
         * */
        page: '',
        /**
         * Change de page
         *
         * @param {string} page Identifiant de la nouvelle page
         *
         * @memberof nav
         * */
        gotoPage: function (page) {
            nav.page = page;
            $(':mobile-pagecontainer').pagecontainer('change', '#' + page);
        },
        /**
         * Retourne à la page courante
         * @memberof nav
         * */
        gotoCurPage: function () {
            var page = '';
            if (nav.page && nav.page !== 'auth') {
                page = nav.page;
            } else {
                page = DEFAULT_PAGE;
            }
            nav.gotoPage(page);
        },
        /**
         * Initialisation du module
         * @memberof nav
         * @see https://api.jquerymobile.com/pagecontainer/
         * */
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
