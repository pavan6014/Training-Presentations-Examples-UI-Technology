attApp.controller('stratumInfoReportController', ['$rootScope', '$scope', 'stratumInfoService' ,'$window', function($rootScope, $scope, stratumInfoService, $window) {
	
	$rootScope.hideheader = true;
	$rootScope.hidefooter = true;
	init();
		
	function init(){
		getStratumInfoReport();
		$scope.tableHeaders = ['PDS Date','Company','Stratum','Market Segment','Head Count','Available','Sample Size','Target Valids'];
	}
	
	function getStratumInfoReport(){
		stratumInfoService.getStratumReportService($window.company).then(function(dataObj){
					$scope.company = dataObj.company;
					$scope.sampleMonth = dataObj.sampleMonth;
					$scope.stratumInfoReport = dataObj.stratumInfo;
		}, handleError);
	}
	
	function handleError(errorObj){
		console.log('Error in fetching Data- '+errorObj.errorDesc);
	}
	
}]);	
	
	