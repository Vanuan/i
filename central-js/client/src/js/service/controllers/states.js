import angularAMD from 'angularAMD';

	angularAMD.controller('ServiceController', ['$state', '$rootScope', '$scope', 'service', 'AdminService', function ($state, $rootScope, $scope, service, AdminService) {
		$scope.service = service;
		$scope.bAdmin = AdminService.isAdmin();
	}]);

	angularAMD.controller('ServiceGeneralController', ['$state', '$rootScope', '$scope', 'service', function ($state, $rootScope, $scope, service) {
		$scope.service = service;
		
		var aServiceData = service.aServiceData;
		
		var isCity = false;
		angular.forEach(aServiceData, function(value, key) {
			if(value.hasOwnProperty('nID_City')) {
				isCity = true;
			}
		});
		if(isCity) {
			return $state.go('service.general.city', {id: service.nID}, { location: false });
		}
		
		var isRegion = false;
		angular.forEach(aServiceData, function(value, key) {
			if(value.hasOwnProperty('nID_Region')) {
				isRegion = true;
			}
		});
		if(isRegion) {
			return $state.go('service.general.region', {id: service.nID}, { location: false });
		}
		
		return $state.go('service.general.country', {id: service.nID}, { location: false });
    }]);

	angularAMD.controller('ServiceInstructionController', ['$state', '$rootScope', '$scope', 'service', 'AdminService', function ($state, $rootScope, $scope, service, AdminService) {
		$scope.service = service;
		$scope.bAdmin = AdminService.isAdmin();
		return $state.go('service.instruction', {id: service.nID, service: service}, { location: false });
    }]);

	angularAMD.controller('ServiceLegislationController', ['$state', '$rootScope', '$scope', 'service', 'AdminService', function ($state, $rootScope, $scope, service, AdminService) {
		$scope.service = service;
		$scope.bAdmin = AdminService.isAdmin();
		return $state.go('service.legislation', {id: service.nID, service: service}, { location: false });
    }]);

	angularAMD.controller('ServiceQuestionsController', ['$state', '$rootScope', '$scope', 'service', 'AdminService', function ($state, $rootScope, $scope, service, AdminService) {
		$scope.service = service;
		$scope.bAdmin = AdminService.isAdmin();
		return $state.go('service.questions', {id: service.nID, service: service}, { location: false });
    }]);

	angularAMD.controller('ServiceDiscussionController', ['$state', '$rootScope', '$scope', 'service', function ($state, $rootScope, $scope, service) {
		$scope.service = service;

		// TODO:Refactoring Consider way to introduce a wrapper directive to keep HC logic and settings
		var HC_LOAD_INIT = false;
		window._hcwp = window._hcwp || [];
		window._hcwp.push({widget: 'Stream', widget_id: 60115});
		if ('HC_LOAD_INIT' in window) return;
		HC_LOAD_INIT = true;
		var lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage ||  'en').substr(0, 2).toLowerCase();
		var hcc = document.createElement('script');
		hcc.type = 'text/javascript';
		hcc.async = true;
		hcc.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://w.hypercomments.com/widget/hc/60115/' + lang + '/widget.js';
		angular.element(document.querySelector('#hypercomments_widget')).append(hcc);

		return $state.go('service.discussion', {id: service.nID, service: service}, { location: false });
    }]);
