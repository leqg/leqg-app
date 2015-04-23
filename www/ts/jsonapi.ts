/**
 * Gère les interactions avec l'API
 *
 * @namespace
 * @author    Pierre Rudloff <contact@rudloff.pro>
 * */
module jsonapi {
    /**
     * Exécute une requête GET
     * @memberof jsonapi
     * @param {string} resource Ressource à récupérer
     * @param {Object} params   Paramètres de la requête
     * @example jsonapi.get('contact', { filters: { search: 'Senger' }, success: searchResult });
     * */
    export function get(resource, params) {
        if (!params) {
            params = {};
        }
        var authorizationHeader,
            callurl = BASE_URL + resource + '/';
        if (params.user) {
            authorizationHeader = 'Basic ' + window.btoa(params.user + ':' + params.pass);
        } else if (auth.token) {
            authorizationHeader = 'LeQG ' + auth.token;
        }
        if (params.id) {
            callurl += params.id;
        }
        $.ajax(
            callurl,
            {
                success: params.success,
                error: params.error,
                headers: {
                    Authorization: authorizationHeader
                },
                data: params.filters,
                statusCode: {
                    403: auth.logout
                }
            }
        );
    }
}

