/*global $*/
/*jslint browser: true*/
var contacts = (function () {
    'use strict';
    var my = {};
    function search() {
    }
    my.init = function () {
        $('#contacts_search_send_btn').click(search);
    };
    return my;
}());

$(document).ready(contacts.init);
