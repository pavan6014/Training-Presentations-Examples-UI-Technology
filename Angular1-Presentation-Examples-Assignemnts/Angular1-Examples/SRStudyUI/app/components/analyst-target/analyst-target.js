attApp.controller('analystTargetController', ['$rootScope', '$scope', '$location', '$http','analystTargetService',function($rootScope, $scope, $location,$http,analystTargetService) {
	
	$rootScope.isFooterFixed = false;
	$scope.analystArray={};
	
	$scope.sumColumns = {
	"telcoTotal":[1,2,3,7,8,9,10,11,12,13,14,15],
	"attSVCTotal":[5],
	"legTTotal":[4],
	"newCoISMTotal":[6],
	"vendorTotal":[16,17],
	"busTotal":[1,7,10,13],
	"conTotal":[2,3,4,5,8,9,11,12,14,15],
	"vndrTotal":[6,16,17],
	"consUVGTotal":[3,9,12,15],
	"consRecTotal":[2,4,5,8,11,14],
	"consVendorTotal":[6,17]
	}
	
	$scope.sumColumnsSubSet1 = {
	"telcoTotal":[1,2,3,7,8,9,10,11,12,13,14,15],
	"attSVCTotal":[5],
	"legTTotal":[4],
	"newCoISMTotal":[6],
	"vendorTotal":[16,17]	
	}
	
	$scope.sumColumnsSubSet2 = {
	"busTotal":[1,7,10,13],
	"conTotal":[2,3,4,5,8,9,11,12,14,15],
	"vndrTotal":[6,16,17]
	}
	
	$scope.sumColumnsSubSet3 = {
	"consUVGTotal":[3,9,12,15],
	"consRecTotal":[2,4,5,8,11,14],
	"consVendorTotal":[6,17]
	}
	
	$scope.sumColumnsSubSet4 = {
	"busTotal":[1,7,10,13,16],
	"conTotal":[2,3,4,5,8,9,11,12,14,15],
	"vndrTotal":[6,17]
	}
	
	$scope.sumColumnsSubSet5 = {
	"busTotal":[1,7,10,13,16]
	}
	
	$scope.sumColumnsSubSet6 = {
	"consUVGTotal":[3,9,12,15],
	"consRecTotal":[2,4,5,8,11,14],
	"consVendorTotal":[6,17],
	"busTotal":[1,7,10,13,16]
	}
	
	
	
	$scope.grandTotal1 = 5;
	$scope.grandTotal2 = 3;
	$scope.grandTotal3 = 3;
	$scope.grandTotal4 = 4;

	
	function getData(){               
analystTargetService.getAnalystTargetReport().then(function (response) {
                
		$scope.assignments = response.data; 

		$scope.buildData = function(){
			var returnArr = [];
			angular.forEach($scope.assignments.companies ,function(company,key){
				angular.forEach(company.stratums, function(stratum,key){
					returnArr.push({stratumName: stratum.stratumName,
					                statMin:stratum.statMin});
				});
			});	
			return returnArr;
		}
		
		$scope.sortedData = $scope.buildData();
		
		var analystData = {};
		
		angular.forEach($scope.assignments.analysts ,function(analysts,analystkey){
		    $scope.assignments.analysts[analystkey].target = [];
			
			var targetIndex=0;
			angular.forEach($scope.assignments.companies ,function(company,companykey){
				
				angular.forEach(company.stratums, function(stratum,key){
				
				  $scope.assignments.analysts[analystkey].target[targetIndex] = stratum.assignments[analystkey].target;
			      targetIndex++;
				  
				});
			
			});
		
		
		});
		
		//console.log(JSON.stringify($scope.assignments.analysts));
		});
	}
	
	
	
	
	
	init();
	function init(){
	getData();
	}

}]);

