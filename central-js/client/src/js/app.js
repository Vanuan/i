import ui_router_extras from 'christopherthielen/ui-router-extras';
import ui_routes from 'angular-ui/ui-router';
import ngMessages from 'angular-messages';
import ngBootstrap from 'angular-bootstrap';
import ngUiUtils from 'angular-ui-utils';
import ZeroClipboard from 'zeroclipboard';
window.ZeroClipboard = ZeroClipboard;
import ngClip from 'ng-clip';
import jquery_cookies from 'jquery.cookie';
import jquery from 'jquery';
window.$ = jquery;
import angularAMD from 'angularAMD';

import templates from 'templates';

import 'bootstrap/css/bootstrap.css!';
import 'src/styles/custom.css!';

  var app = angular.module("main",
    ['ct.ui.router.extras', 'templates-main', 'ngMessages', 'ui.bootstrap',
      'ui.uploader', 'ui.event', 'ngClipboard'
    ]);

  app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });

  app.config(function($futureStateProvider) {
    var ngloadStateFactory = function($q, futureState) {
      var ngloadDeferred = $q.defer();
      System.import(futureState.src).then(function (module) {
        angularAMD.processQueue();
        ngloadDeferred.resolve(undefined);
      });
      return ngloadDeferred.promise;
    };
    var loadAndRegisterFutureStates = function($http) {
      return $http.get('./data.json').then(function(response) {
        angular.forEach(response.data, function(futureState) {
          $futureStateProvider.futureState(futureState);
        });
      });
    };
    $futureStateProvider.stateFactory('ngload', ngloadStateFactory);
    $futureStateProvider.addResolve(loadAndRegisterFutureStates);
  });

  app.config(function($urlRouterProvider) {
    $urlRouterProvider.when('', function($match, $state) {
      $state.transitionTo('index', $match, false);
    });
    $urlRouterProvider.otherwise('/404');
  });

  angularAMD.bootstrap(app);
