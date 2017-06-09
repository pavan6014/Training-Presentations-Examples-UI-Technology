attApp.controller('sampleGenerationReportController', ['$rootScope', '$scope', 'sampleGenerationService' ,'$window', function($rootScope, $scope, sampleGenerationService, $window) {
	
	$rootScope.hideheader = true;
	$rootScope.hidefooter = true;
	init();
	
		
		
	function init(){
			if($window.reportType == "partial-report")
				getPartialMonthlySamples();
			else if($window.reportType == "annual-report")
				getAnnualMonthlySamples();
			else if($window.reportType == "monthly-report")
				getMonthlySamples();
	}
	
	function getAnnualMonthlySamples(){
		sampleGenerationService.annualMonthlySamplesService().then(function(dataObj){
					$scope.monthlySamplesList = dataObj.stratums;
					$scope.monthlySampleDet = [];
					angular.forEach($scope.monthlySamplesList , function(stratumObj,key){
						angular.forEach(stratumObj.sampleDetails, function(stratDet,key){
							if(key == '0'){
								var stratumName = stratumObj.stratumName;
							}
							$scope.sampleDet = {
								'company':stratDet.company,
								'month':stratDet.month,
								'sampleSize':stratDet.sampleSize,
								'stratumName':stratumName
							}
							$scope.monthlySampleDet.push($scope.sampleDet);
						});
					});
			
		}, handleError);
	}
	
	function getPartialMonthlySamples(){
		sampleGenerationService.partialMonthlySamplesService().then(function(dataObj){
					$scope.monthlySamplesList = dataObj.stratums;
					$scope.monthlySampleDet = [];
					angular.forEach($scope.monthlySamplesList , function(stratumObj,key){
						angular.forEach(stratumObj.sampleDetails, function(stratDet,key){
							if(key == '0'){
								var stratumName = stratumObj.stratumName;
							}
							$scope.sampleDet = {
								'company':stratDet.company,
								'month':stratDet.month,
								'sampleSize':stratDet.sampleSize,
								'stratumName':stratumName
							}
							$scope.monthlySampleDet.push($scope.sampleDet);
						});
					});
			
		}, handleError);
	}
	
	function getMonthlySamples(){
		sampleGenerationService.monthlySamplesService().then(function(dataObj){
					$scope.monthlySamplesList = dataObj.stratums;
					$scope.monthlySampleDet = [];
					angular.forEach($scope.monthlySamplesList , function(stratumObj,key){
						angular.forEach(stratumObj.sampleDetails, function(stratDet,key){
							if(key == '0'){
								var stratumName = stratumObj.stratumName;
							}
							$scope.sampleDet = {
								'company':stratDet.company,
								'month':stratDet.month,
								'sampleSize':stratDet.sampleSize,
								'stratumName':stratumName
							}
							$scope.monthlySampleDet.push($scope.sampleDet);
						});
					});
			
		}, handleError);
	}
	
	function handleError(errorObj){
		console.log('Error in fetching Data- '+errorObj.errorDesc);
	}
}]);	
	
	