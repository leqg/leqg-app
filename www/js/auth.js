/*global $, BASE_URL*/
/*jslint browser: true*/
var auth = (function () {
    'use strict';
    var my = {};
    function getToken(e) {
        $.ajax(
            {
                url: BASE_URL,
                headers: { 'Authorization': 'LeQG ' + e.tokens[0].id }
            }
        );
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
            $.ajax(
                {
                    url: BASE_URL + 'authenticate',
                    success: getToken,
                    error: loginError,
                    headers: { 'Authorization': 'Basic ' + window.btoa(email + ':' + $('#auth_pass').val()) }
                }
            );
        }
    }
    my.init = function () {
        var email = localStorage.getItem('auth_email');
        if (email) {
            $('#auth_email').val(email);
        }
        $('#auth_login_btn').click(login);
    };
    return my;
}());

$(document).ready(auth.init);
