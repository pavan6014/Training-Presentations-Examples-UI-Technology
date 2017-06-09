attApp.controller('analystSampleReportsController', ['$rootScope', '$scope', '$location', '$window', 'analystSampleReportsService', function($rootScope, $scope, $location, $window, analystSampleReportsService) {
	$scope.analystSample = {};
	$scope.analystSample.sampleMonth = new Date(2016,02,01);
	$scope.analystSample.currentDate = new Date();
	$rootScope.isFooterFixed = false;
	init();
	
	/* On page Load service call*/
	function init(){
		analystSampleReportsService.getSampleCompanyList().then(function(responseObj) {
			$scope.sampleCompanyList = responseObj;
		}, function(errorObj) {
			
		});
	}
	
	/* Common function for all launch buttons */
	$scope.getAnalystSampleReports = function(param){
        if($scope.auditReportsForm.$invalid){
            $scope.submitted = true;
            $window.scrollTo(0, 0);
        }else if($scope.analystSample.begMonth <= $scope.analystSample.endMonth){
				analystSampleReportsService.setResultDetails(param);
				$window.open("#/analyst-sample-reports/"+param);
		}
	}	

}]);