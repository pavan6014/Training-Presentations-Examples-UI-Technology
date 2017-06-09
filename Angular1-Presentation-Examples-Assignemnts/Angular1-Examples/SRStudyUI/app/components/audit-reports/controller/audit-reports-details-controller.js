attApp.controller('auditReportsDetailsController', ['$rootScope', '$scope', 'auditReportsDetailsService', '$location',  function($rootScope, $scope, auditReportsDetailsService, $location) {
	
	$rootScope.hideheader = true;
	$rootScope.hidefooter = true;
	
	$scope.getAuditReportDetails = function(){
		console.log("Inside getAuditReportDetails");
		auditReportsDetailsService.getAuditReportDetails().then(function(dataObj) {
			console.log("Inside getAuditReportDetailsService");
			console.log(dataObj);
			$scope.auditReportDetails = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});	

		auditReportsDetailsService.getAuditReportDetailsByProducts().then(function(productDataObj) {
			$scope.auditReportDetailsByProducts = productDataObj;
		}, function(errorObj) {
			console.log('Error in fetching audit report details by products list. '+errorObj.status);
		});
		
		auditReportsDetailsService.getAuditReportDetailsFallout().then(function(falloutDataObj) {
			console.log("Inside getAuditReportDetailsService");
			console.log(dataObj);
			$scope.auditReportDetailsFallout = falloutDataObj;
		}, function(errorObj) {
			console.log('Error in fetching audit report details fallout list. '+errorObj.status);
		});		
	}	
	
	
	
	init();
	function init(){
		$scope.header = true;
		$scope.getAuditReportDetails();	
	}
}]);