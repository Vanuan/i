import angularAMD from 'angularAMD';
import './services/catalog';
import './controllers/states';

  var app = angular.module('index', []);

  app.config(function($stateProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        resolve: {
          catalog: function(CatalogService) {
            return CatalogService.getServices();
          }
        },
        views: {
          '': angularAMD.route({
            templateProvider: function($templateCache) {
              return $templateCache.get('html/catalog/services.html');
            },
            controller: 'IndexController',
            controllerUrl: 'js/index/controllers/states'
          })
        }
      })
      .state('subcategory', {
        url: '/subcategory/:catID/:scatID',
        resolve: {
          catalog: function(CatalogService) {
            return CatalogService.getServices();
          }
        },
        views: {
          '': angularAMD.route({
            templateProvider: function($templateCache) {
              return $templateCache.get('html/catalog/subcategory.html');
            },
            controller: 'SubcategoryController',
            controllerUrl: 'js/index/controllers/states'
          })
        }
      });

  }).run(function($rootScope, $state) {
    $rootScope.state = $state;
  });

