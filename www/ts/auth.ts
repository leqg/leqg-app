/**
 * Gestion des connexions
 *
 * @namespace
 * @author    Pierre Rudloff <contact@rudloff.pro>
 * */
module auth {
    /**
     * Appelé en cas de connexion réussie
     *
     * @param {Object} e Événement
     *
     * @memberof auth
     * @inner
     * */
    function authSuccess(e) {
        auth.setToken(e.tokens[0].id);
        nav.gotoPage(DEFAULT_PAGE);
    }
    /**
     * Appelé en cas d'erreur de connexion
     *
     * @param {Object} e Événement
     * @param {status} status Type d'erreur
     *
     * @memberof auth
     * @inner
     * */
    function loginError(e, status) {
        var errorMsg;
        if (status === 'timeout') {
            errorMsg = 'Impossible de se connecter au serveur';
        } else if (status === 'error') {
            errorMsg = e.responseJSON.errors[0].title;
        } else {
            errorMsg = 'Erreur inconnue';
        }
        error.display(errorMsg);
    }
    /**
     * Tentative de connexion
     *
     * @param {Object} e Événement
     *
     * @memberof auth
     * @inner
     * @return   {bool} Retourne false pour empêcher le comportement par défaut du formulaire
     * */
    function login(e) {
        e.preventDefault();
        var email = $('#auth_email').val();
        if (email) {
            localStorage.setItem('auth_email', email);
            if (!navigator.onLine) {
                error.display('Impossible de se connecter au réseau');
            } else {
                jsonapi.get(
                    'authenticate',
                    {
                        success: authSuccess,
                        error: loginError,
                        user: email,
                        pass: $('#auth_pass').val()
                    }
                );
            }
        } else {
            error.display('Veuillez entrer votre adresse e-mail.');
        }
        return false;
    }
    /**
     * Jeton en cours d'utilisation
     * @memberof auth
     * @type string
     * */
    export var token = '';
    /**
     * Enregistre un nouveau token dans le localStorage
     *
     * @param {string} token
     *
     * @memberof auth
     * */
    export function setToken(token) {
        localStorage.setItem('auth_token', token);
        auth.token = token;
    }
    /**
     * Vérifie si le token utilisé est valide
     *
     * @param {function} success Fonction appelée en cas de succès
     * @param {function} error   Fonction appelée en cas d'erreur
     *
     * @memberof auth
     * */
    export function isTokenValid(success, error) {
        jsonapi.get(
            'authenticate',
            {
                success: success,
                error: error
            }
        );
    }
    /**
     * Déconnexion
     * @memberof auth
     * */
    export function logout() {
        auth.token = '';
        localStorage.removeItem('auth_token');
        nav.gotoPage('auth');
        error.display('Vous avez été déconnecté.');
    }
     /**
     * Initialisation du module
     * @memberof auth
     * */
    export function init() {
        var email = localStorage.getItem('auth_email'),
            token = localStorage.getItem('auth_token');
        if (token) {
            auth.token = token;
        }
        if (email) {
            $('#auth_email').val(email);
        }
        $('#auth_form').submit(login);
        if (auth.token) {
            auth.isTokenValid(
                nav.gotoCurPage,
                auth.logout
            );
        } else {
            nav.gotoPage('auth');
        }
    }
}

$(document).ready(auth.init);
