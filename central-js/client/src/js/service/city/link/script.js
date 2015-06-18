import angularAMD from 'angularAMD';

import 'js/service/link/controllers/link';

    var app = angular.module('service.general.city.link', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service.general.city.link', {
                url: '/link',
                views: {
                    'status@service.general.city': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/city/link/index.html');
						}],
						controller: 'ServiceLinkController',
                        controllerUrl: 'js/service/link/controllers/link'
                    })
                }
            })
    }]);
