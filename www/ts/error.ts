/**
 * Gestion des erreurs
 *
 * @namespace
 * @author    Pierre Rudloff <contact@rudloff.pro>
 * */
module error {
    var $error;
    /**
     * Affiche une erreur
     * @memberof error
     * @param {string} msg Message d'erreur à afficher
     * */
    export function display(msg) {
        $('#error_msg').text(msg);
        $error.popup('open');
    }
    /**
     * Initialisation du module
     * @memberof error
     * */
    export function init() {
        $error = $('#error');
        $error.enhanceWithin().popup();
    }
}

$(document).ready(error.init);
