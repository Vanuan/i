import angularAMD from 'angularAMD';
import 'js/service/script';
import 'js/config';
import './controllers/states';

    var app = angular.module('journal', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('journal', {
                url: '/journal',
                views: {
                    '': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/journal/index.html');
						}],
						controller: 'JournalController',
                        controllerUrl: 'js/journal/controllers/states'
                    })
                }
            })
            .state('journal.bankid', {
                url: '/bankid?code',
                parent: 'journal',
                views: {
                    'bankid': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/journal/bankid/index.html');
						}],
						controller: 'JournalBankIdController',
                        controllerUrl: 'js/journal/controllers/states'
                    })
                }
            })
            .state('journal.content', {
                url: '/content?code',
                parent: 'journal',
                resolve: {
                    BankIDLogin: ['$q', '$state', '$location', '$stateParams', 'BankIDService', function($q, $state, $location, $stateParams, BankIDService) {
                        var url = $location.protocol()
                            +'://'
                            +$location.host()
                            +':'
                            +$location.port()
                            +$state.href('journal.bankid', {code: ''});

                        return BankIDService.login($stateParams.code, url).then(function(data) {
                            return data.hasOwnProperty('error') ? $q.reject(null): data;
                        });
                    }],
                    BankIDAccount: ['BankIDService', 'BankIDLogin', function(BankIDService, BankIDLogin) {
                        return BankIDService.account(BankIDLogin.access_token);
                    }],
                    customer: ['BankIDAccount', function (BankIDAccount) {
                        return BankIDAccount.customer;
                    }],
                    journal: ['$q', '$state', 'ServiceService', 'customer', function($q, $state, ServiceService, customer) {
                        return ServiceService.getJournalEvents();
                    }]
                },
                views: {
                    'content': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/journal/content.html');
						}],
						controller: 'JournalContentController',
                        controllerUrl: 'js/journal/controllers/states'
                    })
                }
            })
    }]);
