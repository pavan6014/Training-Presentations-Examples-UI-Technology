attApp.controller('officialResultsController', ['$rootScope', '$scope', '$location', '$window', 'officialResultsService', function($rootScope, $scope, $location, $window, officialResultsService) {	
	
	$rootScope.isFooterFixed = false;	
	
	$scope.getOfficialResultsReport = function(param){
		
        if($scope.officialResultsForm.$invalid){
            $scope.submitted = true;
            $window.scrollTo(0, 0);
        }else if($scope.begMonth <= $scope.endMonth){
				officialResultsService.setResultDetails(param);
				$window.open("#/official-results/"+param);
		}
	}	
	
	init();
	
	function init(){
		officialResultsService.getSampleCompanyList().then(function(dataObj) {		
			$scope.sampleCompanyList = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
		
		officialResultsService.getSampleStratumList().then(function(dataObj) {		
			$scope.sampleStratumList = dataObj;       
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
	}
	
}]);