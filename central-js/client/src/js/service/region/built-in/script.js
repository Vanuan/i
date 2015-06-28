import angularAMD from 'angularAMD';
import 'js/service/built-in/controllers/built-in';

    var app = angular.module('service.general.region.built-in', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service.general.region.built-in', {
                url: '/built-in',
                views: {
                    'content@service.general.region': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/region/built-in/index.html');
						}],
						controller: 'ServiceBuiltInController',
                        controllerUrl: 'js/service/built-in/controllers/built-in'
                    })
                }
            })
			.state('service.general.region.built-in.bankid', {
				url: '/built-in/region/{region:int}/?code',
				parent: 'service.general.region',
				data: {
					region: null,
					city: null
				},
				resolve: {
					region: ['$state', '$stateParams', 'PlacesService', function($state, $stateParams, PlacesService) {
						return PlacesService.getRegion($stateParams.region).then(function(response) {
							var currentState = $state.get('service.general.region.built-in.bankid');
							currentState.data.region = response.data;
							return response.data;
						});
					}],
					oService: ['$stateParams', 'service', function($stateParams, service) {
						return service;
					}],
					oServiceData: ['$stateParams', 'service', function($stateParams, service) {
						var aServiceData = service.aServiceData;
						var oServiceData = null;
						angular.forEach(aServiceData, function(value, key) {
							if(value.nID_Region.nID == $stateParams.region) {
								oServiceData = value;
							}
						});
						return oServiceData;
					}],
					BankIDLogin: ['$q', '$state', '$location', '$stateParams', 'BankIDService', function($q, $state, $location, $stateParams, BankIDService) {
						var url = $location.protocol()
							+'://'
							+$location.host()
							+':'
							+$location.port()
							+$state.href('service.general.region.built-in.bankid', { id: $stateParams.id, region: $stateParams.region });
						
						return BankIDService.login($stateParams.code, url).then(function(data) {
							return data.hasOwnProperty('error') ? $q.reject(null): data;
						});
					}],
					BankIDAccount: ['BankIDService', 'BankIDLogin', function(BankIDService, BankIDLogin) {
						return BankIDService.account(BankIDLogin.access_token);
					}],
					processDefinitions: ['ServiceService', 'oServiceData', function(ServiceService, oServiceData) {
						return ServiceService.getProcessDefinitions(oServiceData, true);
					}],
					processDefinitionId: ['oServiceData', 'processDefinitions', function(oServiceData, processDefinitions) {
						var sProcessDefinitionKeyWithVersion = oServiceData.oData.oParams.processDefinitionId;
						var sProcessDefinitionKey = sProcessDefinitionKeyWithVersion.split(':')[0];
						
						var sProcessDefinitionName = "тест";
                                                //sProcessDefinitionName = "name2";
                                                //var currentState = $state.get('service.general.city.built-in.bankid');
                                                //currentState.data.sProcessDefinitionName2 = "name3";
                                                
						angular.forEach(processDefinitions.data, function(value, key) {
							if(value.key == sProcessDefinitionKey) {
								sProcessDefinitionKeyWithVersion = value.id;
                                                                sProcessDefinitionName = "("+value.name+")";
							}
						});

						//return processDefinitionKeyWithVersion;
						return {sProcessDefinitionKeyWithVersion:sProcessDefinitionKeyWithVersion,sProcessDefinitionName:sProcessDefinitionName};
					}],
					ActivitiForm: ['ActivitiService', 'oServiceData', 'processDefinitionId', function(ActivitiService, oServiceData, processDefinitionId) {
						return ActivitiService.getForm(oServiceData, processDefinitionId);
					}]
				},
				views: {
					'content@service.general.region': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/region/built-in/bankid.html');
						}],
						controller: 'ServiceBuiltInBankIDController',
						controllerUrl: 'js/service/built-in/controllers/built-in'
					})
				}
			})
			.state('service.general.region.built-in.bankid.submitted', {
				url: null,
				data: { id: null },
				onExit:['$state', function($state) {
					var state = $state.get('service.general.region.built-in.bankid.submitted');
					state.data = { id: null };
				}],
				views: {
					'content@service.general.region': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/region/built-in/bankid.submitted.html');
						}],
						controller: ['$state', '$scope', function($state, $scope) {
							$scope.state = $state.get('service.general.region.built-in.bankid.submitted');
						}]
					})
				}
			});
    }]);
