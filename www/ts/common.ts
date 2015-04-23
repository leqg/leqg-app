/**
 * Fonctions à répartir dans les autres modules quand le code sera plus avancé
 *
 * @namespace
 * @author    Pierre Rudloff <contact@rudloff.pro>
 * */
module common {
    /**
     * Appelé lorsque la connexion est coupée
     *
     * @memberof common
     * @inner
     * */
    function lostConnection() {
        $.mobile.loading('hide');
    }
    /**
     * Initialisation du module
     * @memberof common
     * */
    export function init() {
        $window.on('offline', lostConnection);
    }
}

$(document).ready(common.init);
