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
    function loginError(e) {
        $('#auth_error_msg').text(e.responseJSON.errors[0].title);
        $('#auth_error').popup('open');
    }
    function login() {
        var email = $('#auth_email').val();
        localStorage.setItem('auth_email', email);
        $.ajax(
            {
                url: BASE_URL + 'authenticate',
                success: getToken,
                error: loginError,
                headers: { 'Authorization': 'Basic ' + window.btoa(email + ':' + $('#auth_pass').val()) }
            }
        );
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
