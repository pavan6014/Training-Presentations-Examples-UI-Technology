attApp.controller('assignmentmatrixController', ['$rootScope', '$scope', '$location', '$http',function($rootScope, $scope, $location,$http) {
	
	$rootScope.isFooterFixed = false;
	$scope.analystArray={};
	
	$http.get("data/assignmentMatrix.json").success(function(response){               
		
		if(response.status='success'){
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
		}else{
		
		}
	});
	
	$scope.getTotal = function(targetArray){
		var sum = 0;
		angular.forEach(targetArray, function(target,key){
			if (target !== '' && target !== null && typeof target !== 'undefined' && target > 0) {
				sum+=parseInt(target);	
			}
			
		});
		return sum;
	}
	
	$scope.getColumnTotal = function(analystArray,index){
		var sum = 0;
		angular.forEach(analystArray, function(analyst,key){
			if (analyst.target[index] !== '' && analyst.target[index] !== null && typeof analyst.target[index] !== 'undefined' && analyst.target[index] > 0) {
				sum+=parseInt(analyst.target[index]);	
			}
		});
		return sum;
	}

}]);

