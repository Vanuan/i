import angularAMD from 'angularAMD'
import 'js/service/script'
import 'js/form/directives/file2';
import 'js/form/factories/file';

import './controllers/states';

  var app = angular.module('Documents', []);

  app.config(function($stateProvider) {
    $stateProvider
      .state('documents', {
        url: '/documents',
        views: {
          '': angularAMD.route({
            templateProvider: function($templateCache) {
              return $templateCache.get('html/documents/index.html');
            },
            controller: 'DocumentsController',
            controllerUrl: 'js/documents/controllers/states'
          })
        }
      })
	  .state('documents.user', {
		url: '/user',
        views: {
          'content': angularAMD.route({
            templateProvider: function($templateCache) {
              return $templateCache.get('html/documents/user/index.html');
            },
          })
        }
	  })
      .state('documents.bankid', {
        url: '/bankid?code',
        parent: 'documents.user',
        views: {
          'content': angularAMD.route({
            templateProvider: function($templateCache) {
              return $templateCache.get('html/documents/bankid/index.html');
            },
            controller: 'DocumentsBankIdController',
            controllerUrl: 'js/documents/controllers/states'
          })
        }
      })
      .state('documents.view', {
        url: '/view',
        parent: 'documents.user',
        views: {
          'content': angularAMD.route({
            templateProvider: function($templateCache) {
              return $templateCache.get('html/documents/view.html');
            }
          })
        }       
      })
      .state('documents.content', {
        url: '/content?code',
        parent: 'documents.user',
        resolve: {
          BankIDLogin: function($q, $state, $location, $stateParams, BankIDService) {
            var url = $location.protocol()
              + '://'
              + $location.host()
              + ':'
              + $location.port()
              + $state.href('documents.bankid', {code: ''});

            return BankIDService.login($stateParams.code, url).then(function(data) {
              return data.hasOwnProperty('error') ? $q.reject(null) : data;
            });
          },
          BankIDAccount: function(BankIDService, BankIDLogin) {
            return BankIDService.account(BankIDLogin.access_token);
          },
          customer: function(BankIDAccount) {
            return BankIDAccount.customer;
          },
          documents: function($q, $state, ServiceService, BankIDLogin, customer) {
            return ServiceService.getOrUploadDocuments()
                        .then(function(data) {
                            return data;
                        });
          }
        },
        views: {
          'content': angularAMD.route({
            templateProvider: function($templateCache) {
              return $templateCache.get('html/documents/content.html');
            },
            controller: 'DocumentsContentController',
            controllerUrl: 'js/documents/controllers/states'
          })
        }
      })
	  .state('documents.search', {
		url: '/search',
        views: {
          'content': angularAMD.route({
            templateProvider: function($templateCache) {
              return $templateCache.get('html/documents/search/index.html');
            },
          })
        }
	  })
	  .state('documents.notary', {
		url: '/notary',
        views: {
          'content': angularAMD.route({
            templateProvider: function($templateCache) {
              return $templateCache.get('html/documents/notary/index.html');
            },
          })
        }
	  })
  });
