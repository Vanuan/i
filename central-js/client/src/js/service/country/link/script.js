import angularAMD from 'angularAMD';
import 'js/service/link/script';
import 'js/service/link/controllers/link';

    var app = angular.module('service.general.country.link', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service.general.country.link', {
                url: '/link',
                views: {
                    'content@service.general.country': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/country/link/index.html');
						}],
						controller: 'ServiceLinkController',
                        controllerUrl: 'js/service/link/controllers/link'
                    })
                }
            })
    }]);
