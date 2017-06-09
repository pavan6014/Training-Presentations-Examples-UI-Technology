attApp.controller('analystSampleReportsDetailsController', ['$rootScope', '$scope', '$location', '$window', 'analystSampleReportsService', function($rootScope, $scope, $location, $window, analystSampleReportsService) {
	
	$rootScope.hideheader = true;
	$rootScope.hidefooter = true;
	$scope.param = analystSampleReportsService.getResultDetails();
	
	switch($scope.param){
		case 'sample-status-by-company':
			analystSampleReportsService.getSampleStatusByCompany().then(function(responseObj) { 
					$scope.lists = responseObj.lists;
				}, function(errorObj) {
				
			});
		break;
		case 'sample-status-by-office':
			analystSampleReportsService.getSampleStatusByOffice().then(function(responseObj) { 
					$scope.lists = responseObj.lists;
				}, function(errorObj) {
				
				});
		break;
		case 'sample-status-by-analyst':
			analystSampleReportsService.getSampleStatusByAnalyst().then(function(responseObj) { 
					$scope.lists = responseObj.lists;
				}, function(errorObj) {
				
				});
		break;
		case 'sample-status-report':
			analystSampleReportsService.getSampleStatusReport().then(function(responseObj) { 
					$scope.lists = responseObj.lists;
				}, function(errorObj) {
				
				});
		break;
		case 'samples-with-errors-or-flags':
		analystSampleReportsService.getSamplesWithErrorsOrFlags().then(function(responseObj) { 
				$scope.lists = responseObj.lists;
			}, function(errorObj) {
			
			});
		break;	
		case 'samples-with-notes':
		analystSampleReportsService.getSamplesWithNotes().then(function(responseObj) { 
				$scope.lists = responseObj.lists;
			}, function(errorObj) {
			
			});
		break;	
		case 'result-tracking':
		analystSampleReportsService.getResultTracking().then(function(responseObj) { 
				$scope.lists = responseObj.lists;
			}, function(errorObj) {
			
			});
		break;	
		case 'stratum-result-report':
		analystSampleReportsService.getStratumResultReport().then(function(responseObj) { 
				$scope.lists = responseObj.lists;
			}, function(errorObj) {
			
			});
		break;	
		case 'analyst-metrics-report':
		analystSampleReportsService.getAnalystMetricsReport().then(function(responseObj) { 
				$scope.lists = responseObj.lists;
			}, function(errorObj) {
			
			});
		break;	
		case 'analyst-progress-report':
		analystSampleReportsService.getAnalystProgressReport().then(function(responseObj) { 
				$scope.lists = responseObj.lists;
			}, function(errorObj) {
			
			});
		break;	
	}
		
}]);