attApp.controller('dashboardController', ['$rootScope', '$scope', '$location', '$window', 'dashboardService', function($rootScope, $scope, $location, $window, dashboardService) {	
	
	$rootScope.isFooterFixed = false;
	
	init();
	
	function init(){
		dashboardService.getUserDetails().then(function(dataObj) {	
			$scope.userDetails = dataObj;			
			$rootScope.adminLogin = dataObj.admin;
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});	
	}
	
}]);