attApp.controller('analystReportsController', ['$rootScope', '$scope', '$location', '$window', 'analystReportsService', function($rootScope, $scope, $location, $window, analystReportsService) {
	
	
	$rootScope.isFooterFixed = false;
	
	$scope.sampledCompany = '';
	$scope.sampledStratum = '';
	
	$scope.getAssignedAgentsCompany = function(){
        if($scope.analystReportsForm.$invalid){
            $scope.submitted = true;
            $window.scrollTo(0, 0);
        }else 
            $window.open("#/analyst-reports/assigned-agents-month-Company(1)");			
	}
			
	init();
	
	function init(){
		analystReportsService.getSampleCompanyList().then(function(dataObj) {		
			$scope.sampleCompanyList = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
		
		analystReportsService.getSampleStratumList().then(function(dataObj) {		
			$scope.sampleStratumList = dataObj;       
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
	}
	
}]);