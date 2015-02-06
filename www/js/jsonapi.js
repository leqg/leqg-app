/*global $, BASE_URL, auth*/
/*jslint browser: true*/
var jsonapi = (function () {
    'use strict';
    var my = {};
    my.get = function (resource, params) {
        if (!params) {
            params = {};
        }
        var customHeaders = {};
        if (params.user) {
            customHeaders.Authorization = 'Basic ' + window.btoa(params.user + ':' + params.pass);
        } else if (auth.token) {
            customHeaders.Authorization = 'LeQG ' + auth.token;
        }
        $.ajax(
            {
                url: BASE_URL + resource + '/',
                success: params.success,
                error: params.error,
                headers: customHeaders,
                data: params.filters,
                statusCode: {
                    403: auth.logout
                }
            }
        );
    };
    return my;
}());

