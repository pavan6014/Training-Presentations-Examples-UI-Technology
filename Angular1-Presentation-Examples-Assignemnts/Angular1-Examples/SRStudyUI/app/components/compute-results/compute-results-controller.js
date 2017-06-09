attApp.controller('computeResultsController', ['$rootScope', '$scope','$window', '$http','computeResultsService', function($rootScope, $scope, $window, $http, computeResultsService) {
	$rootScope.isFooterFixed = false;
	
	$http.get("data/computeResultsData.json").success(function(response){  
			$scope.analystsResults = response.analystsResults.months;
			$scope.computedResults = response.computedResults;
	});
	
	$scope.run = function(){
		if($scope.computeResults.$invalid){
            $scope.submitted = true;
            $window.scrollTo(0, 0);
        }	
	};
	
	$scope.viewResults = function(){	
		if($scope.computeResults.$invalid){
            $scope.submitted = true;
            $window.scrollTo(0, 0);
        }else 
            $window.open("#/official-results/summary-of-results");		
	};
	init();
	
	function init(){
		computeResultsService.getSampleCompanyList().then(function(dataObj) {		
			$scope.sampleCompanyList = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
		
	}
	
}]);