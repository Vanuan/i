import angularAMD from 'angularAMD';
import './link/script';
import './built-in/script';
import './controllers/states';

    var app = angular.module('service.general.city', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service.general.city', {
                url: '/city',
				resolve: {
					regions: ['$stateParams', 'PlacesService', 'service', function($stateParams, PlacesService, service) {
						return PlacesService.getRegions().then(function(response) {
							var regions = response.data;
							var aServiceData = service.aServiceData;
							
							angular.forEach(regions, function(region) {
								var color = 'red';
								angular.forEach(aServiceData, function(oServiceData) {
									if(oServiceData.hasOwnProperty('nID_City') == false) {
										return;
									}
									var oCity = oServiceData.nID_City;
									var oRegion = oCity.nID_Region;
									if(oRegion.nID == region.nID) {
										color = 'green';
									}
								});
								region.color = color;
							});
							
							return regions;
						});
					}]
				},
                views: {
                    '@service': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/city/index.html');
						}],
						controller: 'ServiceCityController',
                        controllerUrl: 'js/service/city/controllers/states'
                    }),
					'content@service.general.city': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/city/content.html');
						}]
                    })
                }
            })
            .state('service.general.city.error', {
                url: '/absent',
                views: {
					'status@service.general.city': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/city/absent.html');
						}],
                        controller: 'ServiceCityAbsentController',
                        controllerUrl: 'js/service/city/controllers/states'
                    })
                }
            })
    }]);
