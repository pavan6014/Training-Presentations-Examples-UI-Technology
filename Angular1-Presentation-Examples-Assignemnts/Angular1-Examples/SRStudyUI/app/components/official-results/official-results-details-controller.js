attApp.controller('officialResultsDetailsController', ['$rootScope', '$scope', '$location', '$window', 'officialResultsService', function($rootScope, $scope, $location, $window, officialResultsService) {	
	$rootScope.hideheader = true;
	$rootScope.hidefooter = true;
	$scope.param = officialResultsService.getResultDetails();
	init();
	
	function init(){
		officialResultsService.getSummaryOfResultsData().then(function(responseObj) { 
					$scope.summaryOfResultsData = responseObj;
					console.log(responseObj);
				}, function(errorObj) {
				console.log('Error in fetching summary of result data list.');
			});
	}
	switch($scope.param){
		case 'summary-of-results':
			officialResultsService.getSummaryOfResultsData().then(function(responseObj) { 
					$scope.summaryOfResultsData = responseObj;
				}, function(errorObj) {
				
			});
		break;
		case 'profiles-by-market-2c':
			officialResultsService.getProfilesByMarket().then(function(responseObj) { 
					$scope.profileDetails = responseObj;
				}, function(errorObj) {
				
				});
		break;
		case 'profiles-by-market-2d':
			officialResultsService.getProfilesByMarket().then(function(responseObj) { 
					$scope.profileDetails = responseObj;
				}, function(errorObj) {
				
				});
		break;
		case 'ults':
			officialResultsService.getUltsData().then(function(responseObj) { 
					$scope.ultsData = responseObj;
				}, function(errorObj) {
				
				});
		break;
		case 'ults-12':
		officialResultsService.getUltsData().then(function(responseObj) { 
				$scope.ultsData = responseObj;
			}, function(errorObj) {
			
			});
		break;	
	}
		
		
}]);