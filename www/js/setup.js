/*global $*/
$.ajaxSetup(
    {
        beforeSend: function () {
            'use strict';
            $.mobile.loading(
                'show', {
                    text: 'Chargement…',
                    textVisible: true
                }
            );
        },
        complete: function () {
            'use strict';
            $.mobile.loading('hide');
        }
    }
);
