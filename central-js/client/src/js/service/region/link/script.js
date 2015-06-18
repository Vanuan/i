import angularAMD from 'angularAMD';
import 'js/service/link/controllers/link';

    var app = angular.module('service.general.region.link', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service.general.region.link', {
                url: '/link',
                views: {
                    'content@service.general.region': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/region/link/index.html');
						}],
						controller: 'ServiceLinkController',
                        controllerUrl: 'js/service/link/controllers/link'
                    })
                }
            })
    }]);
