/*global $, BASE_URL*/
/*jslint browser: true, devel: true*/
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
    function login() {
        var email = $('#auth_email').val();
        localStorage.setItem('auth_email', email);
        $.ajax(
            {
                url: BASE_URL + 'authenticate',
                success: getToken,
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
