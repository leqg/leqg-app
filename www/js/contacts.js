/*global $, jsonapi, nav, error*/
/*jslint browser: true, unparam: true*/
/**
 * Gestion des contacts
 *
 * @namespace
 * @author    Pierre Rudloff <contact@rudloff.pro>
 * */
var contacts = (function () {
    'use strict';
    var $contacts_search_results_list,
        $contacts_show_info;
    /**
     * Affiche les résultats d'une recherche
     *
     * @param {Object} results Résultats
     *
     * @memberof contacts
     * @inner
     * */
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
    /**
     * Affiche un contact
     *
     * @param {Array} results Informations sur le contact
     *
     * @memberof contacts
     * @inner
     * */
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
    /**
     * Lance une recherche
     *
     * @param {string} query Terme à rechercher
     *
     * @memberof contacts
     * @inner
     * */
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
    /**
     * Prépare une recherche
     *
     * @param {Object} e Événement
     *
     * @memberof contacts
     * @inner
     * @return   {bool} Retourne false pour empêcher le comportement par défaut du formulaire
     * */
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
    /**
     * Charge les informations concernant un contact
     *
     * @memberof contacts
     * @inner
     * */
    function loadContact() {
        jsonapi.get(
            'contact',
            {
                id: localStorage.getItem('contacts_id'),
                success: showContact
            }
        );
    }
    /**
     * Définit le contact courant
     *
     * @param {Object} e Événement
     *
     * @memberof contacts
     * @inner
     * */
    function setCurContact(e) {
        localStorage.setItem('contacts_id', $(e.target).data('contact'));
        $contacts_show_info.empty();
    }
    return {
        /**
         * Appelé lorsqu'on arrive sur une page du module contacts
         * @memberof contacts
         * @param {string} pageid
         * @see nav~setPage
         * */
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
        /**
         * Initialisation du module
         * @memberof contact
         * */
        init: function () {
            $contacts_search_results_list = $('#contacts_search_results_list');
            $contacts_show_info = $('#contacts_show_info');
            $('#contacts_search_form').submit(startSearch);
            $('#contacts_search_results_list').on('click', 'a', setCurContact);
        }
    };
}());

$(document).ready(contacts.init);
