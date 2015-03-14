/*global $, $window*/
/*jslint browser: true*/
/**
 * Fonctions à répartir dans les autres modules quand le code sera plus avancé
 *
 * @namespace
 * @author    Pierre Rudloff <contact@rudloff.pro>
 * */
var common = (function () {
    'use strict';
    /**
     * Appelé lorsque la connexion est coupée
     *
     * @memberof common
     * @inner
     * @listens  offline
     * */
    function lostConnection() {
        $.mobile.loading('hide');
    }
    return {
        /**
         * Initialisation du module
         * @memberof common
         * */
        init: function () {
            $window.on('offline', lostConnection);
        }
    };
}());

$(document).ready(common.init);
