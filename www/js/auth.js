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
        $.ajax(
            {
                url: BASE_URL + 'authenticate',
                success: getToken,
                headers: { 'Authorization': 'Basic ' + window.btoa($('#auth_email').val() + ':' + $('#auth_pass').val()) }
            }
        );
    }
    my.init = function () {
        $('#auth_login_btn').click(login);
    };
    return my;
}());

$(document).ready(auth.init);
