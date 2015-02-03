/*global $*/
/*jslint browser: true, devel: true*/
var auth = (function () {
    'use strict';
    var my = {};
    function getToken(e) {
        //On reçoit le token ici
        console.log(e);
    }
    function login() {
        $.ajax(
            {
                dataType: 'json',
                method: 'POST',
                url: 'http://api.leqg.info/authenticate',
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
