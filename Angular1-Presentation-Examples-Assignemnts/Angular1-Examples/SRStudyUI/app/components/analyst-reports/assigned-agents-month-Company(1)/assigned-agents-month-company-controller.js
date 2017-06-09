attApp.controller('assignedAgentsCompanyController', ['$rootScope', '$scope', 'assignedAgentsCompanyService', '$location', '$window',  function($rootScope, $scope, assignedAgentsCompanyService, $location) {
	
	$rootScope.hideheader = true;
	$rootScope.hidefooter = true;
	
	
	$scope.getAssignedAgentsCompanyReport = function(){
		
		assignedAgentsCompanyService.getAssignedAgentsCompanyReport().then(function(dataObj) {
			$scope.assignedAgentsCompany = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});		
	}	
	
	init();
	function init(){
		$scope.header = true;
		$scope.getAssignedAgentsCompanyReport();		
	}
}]);