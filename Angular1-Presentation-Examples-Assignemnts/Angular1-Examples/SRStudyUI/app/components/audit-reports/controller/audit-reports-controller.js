attApp.controller('auditReportsController', ['$rootScope', '$scope', 'auditReportsService', '$location','$window',  function($rootScope, $scope, auditReportsService, $location,$window) {

    $scope.companyDetails = function(){
		auditReportsService.getSampleCompanyList().then(function(dataObj) {		
			$scope.sampleCompanyList = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
    }

    $scope.getReports = function(param){
        if($scope.auditReportsForm.$invalid){
            $scope.submitted = true;
            $window.scrollTo(0, 0);
        }
        else if(param === "employee")
            $window.open("#/audit-reports/audit-reports-details")
		
		else if(param === "products")
			$window.open("#/audit-reports/audit-reports-details-byProducts")
		
		else if(param === "fallout")
			$window.open("#/audit-reports/audit-reports-details-fallout")
    }

	
	init();
	function init(){
		$rootScope.isFooterFixed = false;
		$scope.companyDetails();
	}
}]);