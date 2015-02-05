/*global $, BASE_URL, DEFAULT_PAGE, nav, jsonapi*/
/*jslint browser: true*/
var auth = (function () {
    'use strict';
    var my = {};
    function authSuccess(e) {
        my.setToken(e.tokens[0].id);
        nav.gotoPage(DEFAULT_PAGE);
    }
    function displayError(msg) {
        $('#auth_error_msg').text(msg);
        $('#auth_error').popup('open');
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
        displayError(errorMsg);
    }
    function login() {
        var email = $('#auth_email').val();
        localStorage.setItem('auth_email', email);
        if (!navigator.onLine) {
            displayError('Impossible de se connecter au réseau');
        } else {
            jsonapi.get('authenticate', {
                success: authSuccess,
                error: loginError,
                user: email,
                pass: $('#auth_pass').val()
            });
        }
    }
    my.token = '';
    my.setToken = function (token) {
        localStorage.setItem('auth_token', token);
        my.token = token;
    };
    my.isTokenValid = function (success, error) {
        jsonapi.get('authenticate', {
            success: success,
            error: error
        });
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
        $('#auth_login_btn').click(login);
    };
    return my;
}());

$(document).ready(auth.init);
