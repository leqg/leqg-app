/*global $, jsonapi, nav, error*/
/*jslint browser: true, unparam: true*/
var contacts = (function () {
    'use strict';
    var my = {},
        $contacts_search_results_list,
        searchquery;
    function searchResult(results) {
        if (results.contacts && results.contacts.length > 0) {
            $contacts_search_results_list.empty();
            $.each(
                results.contacts,
                function (index, contact) {
                    $contacts_search_results_list.append('<li>' + contact.nom + ' ' + contact.prenoms + '</li>');
                }
            );
            $contacts_search_results_list.listview().listview('refresh');
            nav.gotoPage('contacts_search_results');
        } else {
            error.display('Aucun résultat');
        }
    }
    function search(query) {
        localStorage.setItem('contact_searchquery', query);
        searchquery = query;
        jsonapi.get(
            'contact',
            {
                filters: {
                    search: query
                },
                success: searchResult
            }
        );
    }
    function startSearch() {
        search($('#contacts_search_query').val());
    }
    my.init = function () {
        $contacts_search_results_list = $('#contacts_search_results_list');
        $('#contacts_search_send_btn').click(startSearch);
        searchquery = localStorage.getItem('contact_searchquery');
        if (location.hash === '#contacts_search_results' && searchquery) {
            search(searchquery);
        }
    };
    return my;
}());

$(document).ready(contacts.init);
