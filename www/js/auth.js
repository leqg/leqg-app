/*global $, BASE_URL, DEFAULT_PAGE, nav, jsonapi, error*/
/*jslint browser: true*/
var auth = (function () {
    'use strict';
    var my = {};
    function authSuccess(e) {
        my.setToken(e.tokens[0].id);
        nav.gotoPage(DEFAULT_PAGE);
    }
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
    function login(e) {
        e.preventDefault();
        var email = $('#auth_email').val();
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
        return false;
    }
    my.token = '';
    my.setToken = function (token) {
        localStorage.setItem('auth_token', token);
        my.token = token;
    };
    my.isTokenValid = function (success, error) {
        jsonapi.get(
            'authenticate',
            {
                success: success,
                error: error
            }
        );
    };
    my.logout = function () {
        my.token = '';
        localStorage.removeItem('auth_token');
        nav.gotoPage('auth');
        error.display('Vous avez été déconnecté.');
    };
    my.init = function () {
        var email = localStorage.getItem('auth_email'),
            token = localStorage.getItem('auth_token');
        if (token) {
            my.token = token;
        }
        if (email) {
            $('#auth_email').val(email);
        }
        $('#auth_form').submit(login);
        if (auth.token) {
            auth.isTokenValid(
                nav.gotoCurPage,
                my.logout
            );
        } else {
            nav.gotoPage('auth');
        }
    };
    return my;
}());

$(document).ready(auth.init);
