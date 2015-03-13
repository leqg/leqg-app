/*global $, BASE_URL, auth*/
/*jslint browser: true*/
/**
 * @namespace
 * @author Pierre Rudloff <contact@rudloff.pro>
 * */
var jsonapi = (function () {
    'use strict';
    /**
     * @scope jsonapi
     * */
    return {
        get: function (resource, params) {
            if (!params) {
                params = {};
            }
            var customHeaders = {},
                callurl = BASE_URL + resource + '/';
            if (params.user) {
                customHeaders.Authorization = 'Basic ' + window.btoa(params.user + ':' + params.pass);
            } else if (auth.token) {
                customHeaders.Authorization = 'LeQG ' + auth.token;
            }
            if (params.id) {
                callurl += params.id;
            }
            $.ajax(
                {
                    url: callurl,
                    success: params.success,
                    error: params.error,
                    headers: customHeaders,
                    data: params.filters,
                    statusCode: {
                        403: auth.logout
                    }
                }
            );
        }
    };
}());

