import angularAMD from 'angularAMD';
import './link/script';
import './built-in/script';
import './controllers/states';

    var app = angular.module('service.general.region', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service.general.region', {
                url: '/region',
				resolve: {
					regions: ['$stateParams', 'PlacesService', 'service', function($stateParams, PlacesService, service) {
						return PlacesService.getRegions().then(function(response) {
							var regions = response.data;
							var aServiceData = service.aServiceData;
							
							angular.forEach(regions, function(region) {
								var color = 'red';
								angular.forEach(aServiceData, function(oServiceData) {
									if(oServiceData.hasOwnProperty('nID_Region') == false) {
										return;
									}
									var oRegion = oServiceData.nID_Region;
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
							return $templateCache.get('html/service/region/index.html');
						}],
						controller: 'ServiceRegionController',
                        controllerUrl: 'js/service/region/controller/states'
                    }),
					'content@service.general.region': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/region/content.html');
						}]
                    })
                }
            })
            .state('service.general.region.error', {
                url: '/absent',
                views: {
					'content@service.general.region': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/region/absent.html');
						}]
                    })
                }
            })
    }]);
