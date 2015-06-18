import angularAMD from 'angularAMD';

	angularAMD.controller('ServiceLinkController', ['$location', '$state', '$rootScope', '$scope', function ($location, $state, $rootScope, $scope) {
		$scope.$location = $location;
		$scope.$state = $state;
    }]);
