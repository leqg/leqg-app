/*global $, jsonapi, nav, error*/
/*jslint browser: true, unparam: true*/
/**
 * @namespace
 * */
var contacts = (function () {
    'use strict';
    var $contacts_search_results_list,
        $contacts_show_info;
    function searchResult(results) {
        if (results.contacts && results.contacts.length > 0) {
            $contacts_search_results_list.empty();
            $.each(
                results.contacts,
                function (index, contact) {
                    $contacts_search_results_list.append('<li><a href="#contacts_show" data-contact="' + contact.id + '">' + contact.nom + ' ' + contact.prenoms + '</a></li>');
                }
            );
            $contacts_search_results_list.listview().listview('refresh');
        } else {
            nav.gotoPage('contacts_search');
            error.display('Aucun résultat');
        }
    }
    function showContact(results) {
        $contacts_show_info.empty();
        $.each(
            results.contacts[0],
            function (index, info) {
                $('#contacts_show_info').append('<li>' + index + ' : ' + info + '</li>');
            }
        );
        $contacts_show_info.listview('refresh');
    }
    function search(query) {
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
    function startSearch(e) {
        e.preventDefault();
        var query = $('#contacts_search_query').val();
        if (query) {
            localStorage.setItem('contacts_searchquery', query);
            $contacts_search_results_list.empty();
            nav.gotoPage('contacts_search_results');
        } else {
            error.display('Veuillez entrer une requête');
        }
        return false;
    }
    function loadContact() {
        jsonapi.get(
            'contact',
            {
                id: localStorage.getItem('contacts_id'),
                success: showContact
            }
        );
    }
    function setCurContact(e) {
        localStorage.setItem('contacts_id', $(e.target).data('contact'));
        $contacts_show_info.empty();
    }
    /**
     * @scope contacts
     * */
    return {
        onnav: function (pageid) {
            switch (pageid) {
            case 'contacts_show':
                loadContact();
                break;
            case 'contacts_search_results':
                var searchquery = localStorage.getItem('contacts_searchquery');
                if (searchquery) {
                    search(searchquery);
                } else {
                    nav.gotoPage('contacts_search');
                }
                break;
            }
        },
        init: function () {
            $contacts_search_results_list = $('#contacts_search_results_list');
            $contacts_show_info = $('#contacts_show_info');
            $('#contacts_search_form').submit(startSearch);
            $('#contacts_search_results_list').on('click', 'a', setCurContact);
        }
    };
}());

$(document).ready(contacts.init);
