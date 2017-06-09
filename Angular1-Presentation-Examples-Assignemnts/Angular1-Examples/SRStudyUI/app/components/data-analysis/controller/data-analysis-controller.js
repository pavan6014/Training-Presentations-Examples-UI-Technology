attApp.controller('dataAnalysisController', ['$rootScope', '$scope','dataAnalysisService','officialResultsService','$window','JSONToCSVConvertor',function($rootScope, $scope,dataAnalysisService,officialResultsService,$window,JSONToCSVConvertor) {

	$rootScope.isFooterFixed = false;
	
	$scope.getDataAnalysisReport = function(param){		
        if($scope.dataAnalysisForm.$invalid){
            $scope.submitted = true;
            $window.scrollTo(0, 0);
        }else if($scope.begMonth <= $scope.endMonth){
				officialResultsService.setResultDetails(param);
				sessionStorage.selectedCompany = $scope.sampledCompany;	
				sessionStorage.begMonth = ('0' + $scope.begMonth.getDate()).slice(-2)+'/'+('0' + ($scope.begMonth.getMonth())).slice(-2) + '/' + $scope.begMonth.getFullYear();
				sessionStorage.endMonth = ('0' + $scope.endMonth.getDate()).slice(-2)+'/'+('0' + ($scope.endMonth.getMonth())).slice(-2) + '/' + $scope.endMonth.getFullYear();;	
				$window.open("#/data-analysis/"+param);
		}
	}	
	
	$scope.exportSatisfactionData = function(){
		if($scope.dataAnalysisForm.$invalid){
            $scope.submitted = true;
            $window.scrollTo(0, 0);
        }else if($scope.begMonth <= $scope.endMonth){
			dataAnalysisService.getSatisfactionDataReportDetails().then(function(dataObj) {
				$scope.satisfactionDataList = dataObj;
				JSONToCSVConvertor.JSONToCSVConvertor($scope.satisfactionDataList,"","Satisfaction Data",true);
			}, function(errorObj) {
				console.log('Error in fetching area list. '+errorObj.status);
			});	
			
		}	
		
	}
	
	init();
		 
	function init(){		
		dataAnalysisService.getSampleCompanyList().then(function(dataObj) {
			console.log(dataObj);
				$scope.sampleCompanyList = dataObj;
			}, function(errorObj) {
				console.log('Error in fetching sampled company list.');
			});
			
		dataAnalysisService.getSamplePickProductList().then(function(dataObj) {
			console.log(dataObj);
				$scope.samplePickProductList = dataObj;
			}, function(errorObj) {
				console.log('Error in fetching sampled pick product list.');
			});
			
		dataAnalysisService.getSamplePickDescList().then(function(dataObj) {
			console.log(dataObj);
				$scope.samplePickDescList = dataObj;
			}, function(errorObj) {
				console.log('Error in fetching sampled product Description list.');
			});
			
	
	}
	
}
]);