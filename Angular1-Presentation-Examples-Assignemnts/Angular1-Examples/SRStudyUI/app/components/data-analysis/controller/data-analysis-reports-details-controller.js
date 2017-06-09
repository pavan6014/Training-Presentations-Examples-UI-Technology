attApp.controller('dataAnalysisReportController', ['$rootScope', '$scope', 'dataAnalysisService','officialResultsService', '$filter', '$location','JSONToCSVConvertor',  function($rootScope, $scope, dataAnalysisService, officialResultsService, $filter, $location, JSONToCSVConvertor) {
	
	$rootScope.hideheader = true;
	$rootScope.hidefooter = true;
	$scope.header = true;
	$scope.param = officialResultsService.getResultDetails();
	
	switch($scope.param){
		case 'original-data-by-disp-report':
			dataAnalysisService.getOriginalDatabyDispReportDetails().then(function(responseObj) { 
					$scope.originalDataByDispReportDetails = responseObj;
				}, function(errorObj) {
				
			});
		break;
		case 'original-data-by-order-type':
			dataAnalysisService.getOriginalDatabyOrderTypeReportDetails().then(function(responseObj) { 
					$scope.originalDataByOrderTypeDetails = responseObj;
				}, function(errorObj) {
				
				});
		break;
		case 'product-secs-report': 
			dataAnalysisService.getProductSecsReportDetails().then(function(responseObj) { 
					$scope.productSecsReportDetails = responseObj;
				}, function(errorObj) {
				
				});
		break;	
		case 'navigator-extracts':			
				$scope.sampledCompany = sessionStorage.selectedCompany;				
				var begDate = sessionStorage.begMonth.split('/'); 			
				$scope.begMonth = new Date(begDate[2],begDate[1],begDate[0]);
				begDate = sessionStorage.endMonth.split('/'); 
				$scope.endMonth = new Date(begDate[2],begDate[1],begDate[0]);
				$scope.extractType = "business";
				$scope.exportProductData = function(){
					dataAnalysisService.getNavigatorExtractDetails().then(function(responseObj) {
						$scope.navigatorExtractDetails = responseObj;						
						var reportName = "Navigator Extract";
						if($scope.company != undefined && $scope.company){							
							reportName = "Project Bauer plus Order Type Report";
						}else{
							//remove total from response
							for(var i = 0; i < responseObj.length; i++) {
								delete responseObj[i]['Total Seconds'];
							}
							$scope.navigatorExtractDetails = responseObj;	
						}
						//console.log(JSON.stringify($scope.navigatorExtractDetails));
						JSONToCSVConvertor.JSONToCSVConvertor($scope.navigatorExtractDetails,"",reportName,true);
					}, function(errorObj) {
					
					});
					
				}
				
		break;		
	}		
	
	$scope.getTotal = function(targetArray){	
		var sum = 0;
		angular.forEach(targetArray, function(target,key){		
			if (target.value !== '' && target.value !== null && typeof target.value !== 'undefined' && target.value >= 0) {
				sum+=parseInt(target.value);	
			}			
		});
		return sum;
	}
	
	$scope.getGrandTotal = function(response, keyHeading){	
		var targetArray = response;
		var sum = 0;
		angular.forEach(targetArray, function(target,key){
			angular.forEach(target.value, function(target1,key1){
				angular.forEach(target1.subParts, function(target2,key2){
					if(target2.key == keyHeading){
						if (target2.value !== '' && target2.value !== null && typeof target2.value !== 'undefined' && target2.value >= 0) {
							sum+=parseInt(target2.value);								
						}
					}					
				});
			});		
		});		
		return sum;
	}
	
	$scope.getTotalForGroup = function(detail, keyHeading){
		var sum = 0;
		if(detail.key == keyHeading){
			angular.forEach(detail.value, function(key1, target1){			
				angular.forEach(key1.subParts, function(key2, target2){	
						if (key2.value !== '' && key2.value !== null && typeof key2.value !== 'undefined' && key2.value >= 0) {
							sum+=parseInt(key2.value);
						}			
				});
			});	
		}		
		return sum;
	}
	
	$scope.getRowTotal = function(targetArray, index){
		var sum = 0;			
			$.each(targetArray.value, function(key1, target1){
				$.each(target1.subParts, function(key2, target2){						
						if(key2 == index){
							if (target2.value !== '' && target2.value !== null && typeof target2.value !== 'undefined' && target2.value >= 0) {
								sum+=parseInt(target2.value);
							}
							return false; 
						}							
				});
			});					
		return sum;
	}
	
	$scope.getGrandTotalFinal = function(response){	
	var targetArray = response;
		var sum = 0;
		angular.forEach(targetArray, function(target,key){
			angular.forEach(target.value, function(target1,key1){
				angular.forEach(target1.subParts, function(target2,key2){					
						if (target2.value !== '' && target2.value !== null && typeof target2.value !== 'undefined' && target2.value >= 0) {
							sum+=parseInt(target2.value);															
						}									
				});
			});		
		});		
		return sum;
	}	
	dataAnalysisService.getSampleCompanyList().then(function(dataObj) {
			console.log(dataObj);
				$scope.sampleCompanyList = dataObj;
			}, function(errorObj) {
				console.log('Error in fetching sampled company list.');
			});
}]);