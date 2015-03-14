/*global $*/
/*jslint browser: true*/
/**
 * Gestion des erreurs
 *
 * @namespace
 * @author    Pierre Rudloff <contact@rudloff.pro>
 * */
var error = (function () {
    'use strict';
    var $error;
    return {
        /**
         * Affiche une erreur
         * @memberof error
         * @param {string} msg Message d'erreur à afficher
         * */
        display: function (msg) {
            $('#error_msg').text(msg);
            $error.popup('open');
        },
        /**
         * Initialisation du module
         * @memberof error
         * */
        init: function () {
            $error = $('#error');
            $error.enhanceWithin().popup();
        }
    };
}());

$(document).ready(error.init);
