import angularAMD from 'angularAMD';
import 'js/service/built-in/controllers/built-in';

    var app = angular.module('service.general.country.built-in', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service.general.country.built-in', {
                url: '/built-in',
                views: {
                    'content@service.general.country': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/country/built-in/index.html');
						}],
						controller: 'ServiceBuiltInController',
                        controllerUrl: 'js/service/built-in/controllers/built-in'
                    })
                }
            })
			.state('service.general.country.built-in.bankid', {
				url: '/built-in/?code',
				parent: 'service.general.country',
				data: {
					region: null,
					city: null
				},
				resolve: {
					oService: ['$stateParams', 'service', function($stateParams, service) {
						return service;
					}],
					oServiceData: ['$stateParams', 'service', function($stateParams, service) {
						var aServiceData = service.aServiceData;
						return aServiceData[0];
					}],
					BankIDLogin: ['$q', '$state', '$location', '$stateParams', 'BankIDService', function($q, $state, $location, $stateParams, BankIDService) {
						var url = $location.protocol()
							+'://'
							+$location.host()
							+':'
							+$location.port()
							+$state.href('service.general.country.built-in.bankid', { id: $stateParams.id });
						
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
					'content@service.general.country': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/country/built-in/bankid.html');
						}],
						controller: 'ServiceBuiltInBankIDController',
						controllerUrl: 'js/service/built-in/controllers/built-in'
					})
				}
			})
			.state('service.general.country.built-in.bankid.submitted', {
				url: null,
				data: { id: null },
				onExit:['$state', function($state) {
					var state = $state.get('service.general.country.built-in.bankid.submitted');
					state.data = { id: null };
				}],
				views: {
					'content@service.general.country': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/country/built-in/bankid.submitted.html');
						}],
						controller: ['$state', '$scope', function($state, $scope) {
							$scope.state = $state.get('service.general.country.built-in.bankid.submitted');
						}]
					})
				}
			});
    }]);
