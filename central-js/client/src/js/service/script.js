import angularAMD from 'angularAMD';
import 'js/config';
import 'js/index/script';
import './country/script';
import './region/script';
import './city/script';
import './services/places';
import './services/service';
import './services/messages';
import './services/admin';
import './services/auth/serviceAuthBlock';
import 'js/places/factories/regionList'
import 'js/places/factories/localityList'
import 'js/bankid/services/bankid'
import 'js/activiti/services/activiti'
import 'js/components/select/directives/optionsClass'
import 'js/form/directives/slotPicker'
import './controllers/states'

    var app = angular.module('service', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service', {
                url: '/service/{id:int}',
				resolve: {
					service: ['$stateParams', 'ServiceService', function($stateParams, ServiceService) {
						return ServiceService.get($stateParams.id);
					}]
				},
                views: {
                    '': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/index.html');
						}],
						controller: 'ServiceController',
                        controllerUrl: 'js/service/controllers/states'
                    })
                }
            })
			.state('service.general', {
				url: '/general',
                            views: {
                                '': angularAMD.route({
                                    templateProvider: ['$templateCache', function($templateCache) {
                                                                    return $templateCache.get('html/service/general.html');
                                                            }],
                                                            controller: 'ServiceGeneralController',
                                    controllerUrl: 'js/service/controllers/states'
                                })
                            }
			})
			.state('service.instruction', {
				url: '/instruction',
                            views: {
                                '': angularAMD.route({
                                    templateProvider: ['$templateCache', function($templateCache) {
                                                                    return $templateCache.get('html/service/instruction.html');
                                                            }],
                                                            controller: 'ServiceInstructionController',
                                    controllerUrl: 'js/service/controllers/states'
                                })
                            }
			})
			.state('service.legislation', {
				url: '/legislation',
                            views: {
                                '': angularAMD.route({
                                    templateProvider: ['$templateCache', function($templateCache) {
                                                                    return $templateCache.get('html/service/legislation.html');
                                                            }],
                                                            controller: 'ServiceLegislationController',
                                    controllerUrl: 'js/service/controllers/states'
                                })
                            }
			})
			.state('service.questions', {
				url: '/questions',
                            views: {
                                '': angularAMD.route({
                                    templateProvider: ['$templateCache', function($templateCache) {
                                                                    return $templateCache.get('html/service/questions.html');
                                                            }],
                                                            controller: 'ServiceQuestionsController',
                                    controllerUrl: 'js/service/controllers/states'
                                })
                            }
			})
			.state('service.discussion', {
				url: '/discussion',
                            views: {
                                '': angularAMD.route({
                                    templateProvider: ['$templateCache', function($templateCache) {
                                                                    return $templateCache.get('html/service/discussion.html');
                                                            }],
                                                            controller: 'ServiceDiscussionController',
                                    controllerUrl: 'js/service/controllers/states'
                                })
                            }
			})
    }]);

