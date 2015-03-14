/*global $*/
/*jslint browser: true*/
//Configuration des requêtes AJAX
$.ajaxSetup(
    {
        beforeSend: function () {
            'use strict';
            $.mobile.loading(
                'show',
                {
                    text: 'Chargement…',
                    textVisible: true
                }
            );
        },
        complete: function () {
            'use strict';
            $.mobile.loading('hide');
        },
        dataType: 'json',
        timeout: 5000
    }
);
//Configuration de jQuery Mobile
$(document).on(
    'mobileinit',
    function () {
        'use strict';
        $.extend(
            $.mobile,
            {
                defaultPageTransition: 'none'
            }
        );
    }
);
