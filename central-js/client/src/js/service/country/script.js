import angularAMD from 'angularAMD';
import './link/script';
import './built-in/script'
import './controllers/states'

    var app = angular.module('service.general.country', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service.general.country', {
                url: '/country',
                views: {
                    '@service': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/country/index.html');
						}],
						controller: 'ServiceCountryController',
                        controllerUrl: 'js/service/country/controllers/states'
                    })
                }
            })
            .state('service.general.country.error', {
                url: '/absent',
                views: {
					'content@service.general.country': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/country/absent.html');
						}],
                        controller: 'ServiceCountryAbsentController',
                        controllerUrl: 'js/service/country/controllers/states'
                    })
                }
            })
    }]);
