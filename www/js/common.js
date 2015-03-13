/*global $, $window*/
/*jslint browser: true*/
/**
 * Fonctions à répartir dans les autres modules quand le code sera plus avancé
 * @namespace
 * */
var common = (function () {
    'use strict';
    /**
     * Appelé lorsque la connexion est coupée
     * */
    function lostConnection() {
        $.mobile.loading('hide');
    }
    /**
     * @scope common
     * */
    return {
        /**
         * Initialisation du module
         * */
        init: function () {
            $window.on('offline', lostConnection);
        }
    };
}());

$(document).ready(common.init);
