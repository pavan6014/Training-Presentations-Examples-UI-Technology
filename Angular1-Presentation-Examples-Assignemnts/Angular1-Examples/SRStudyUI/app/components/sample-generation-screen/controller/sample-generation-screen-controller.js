attApp.controller('sampleGenerationController', ['$rootScope', '$scope', 'sampleGenerationService','JSONToCSVConvertor' ,'$window',  function($rootScope, $scope, sampleGenerationService,JSONToCSVConvertor,$window) {
	
	
	$scope.getMonthlySamples = function(reportType){
		newReportWindow = $window.open("#/sample-generation-report-screen");
		newReportWindow.reportType = reportType;
	}
	
	$scope.getStratumInfoReport = function(){
		windowData = $window.open("#/stratum-info-report");
		windowData.company = $scope.companySel;
	}

	$scope.sampleGenerationService = function(){
		sampleGenerationService.sampleGenerationService().then(function(dataObj) {
			console.log("Inside getAuditReportDetailsService");
			console.log(dataObj);
			$scope.JsonData = dataObj;
			JSONToCSVConvertor.JSONToCSVConvertor($scope.JsonData,"","sampleGenerationMonthlyReport",true);
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});		
	}	
	
	$scope.selectCompany = function(index){
		$scope.companySel = $scope.sampleStatusList[index].company;
	}
	
	init();
	function init(){
		$rootScope.isFooterFixed = false;
		getSampleStatusList();
		
	}		
	
	function handleError(errorObj){
		console.log('Error in fetching Data- '+errorObj.errorDesc);
	}
	
	function getSampleStatusList(){
		sampleGenerationService.sampleStatusTblService().then(function(dataObj) {
			$scope.sampleStatusList = dataObj;
			$scope.companySel = $scope.sampleStatusList[0].company;
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});
		//uncomment when webservice work. Fetches month elink for screen
		/* sampleGenerationService.monthElinkService().then(function(dataObj) {alert(JSON.stringify(dataObj));
			//$scope.sampleStatusList = dataObj;
			//$scope.companySel = $scope.sampleStatusList[0].company;
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});	*/
		
		
	}
}]);