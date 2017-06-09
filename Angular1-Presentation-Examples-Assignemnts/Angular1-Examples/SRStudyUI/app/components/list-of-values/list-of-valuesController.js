attApp.controller('valueController', ['$rootScope', '$scope', '$location','JSONToCSVConvertor','listOfValuesService','$filter','normalizeDate','toaster', function($rootScope, $scope, $location,JSONToCSVConvertor,listOfValuesService,$filter,normalizeDate,toaster) {

init();$scope.newRec = {};
$scope.tbheaders = [
  {"headerName":"Lookup Name",
    "type":"text"
  },
  {"headerName":"Lookup Value",
    "type":"text"
  },
  {"headerName":"Display Value",
    "type":"text"
  },
  {"headerName":"Value 1",
    "type":"number"
  },
  {"headerName":"Value 2",
    "type":"number"
  },
  {"headerName":"Value 3",
    "type":"number"
  },
  {"headerName":"Value 4",
    "type":"number"
  },
  {"headerName":"Value 5",
    "type":"number"
  },
  {"headerName":"Active Flag",
    "type":"text"
  },
  {"headerName":"Created By",
    "type":"text"
  },
  {"headerName":"Created Date",
    "type":"date"
  },
  {"headerName":"Modified By",
    "type":"text"
  },
  {"headerName":"Modified Date",
    "type":"date"
  }
];
	$scope.rowSelected = 0;
	
	$scope.selectCheckbox = function(selected){
		if(selected)
			$scope.rowSelected++;
		else
			$scope.rowSelected--;
		$scope.errorMsg = "";
	}
	
	$scope.add = function(dataObj){
		listOfValuesService.addListOfValues(dataObj.newRec).then(function handleSuccess(responseObj){
			$scope.tbdata.splice(0,0,dataObj.newRec);	
			$scope.newRec = {};
			toaster.clear();
				toaster.pop({
						type: 'success',
						body: 'List Of Vlaues Records Added successfully',
						timeOut: 3000
				});
		}, function handleError(){
			toaster.clear();
				toaster.pop({
						type: 'Error',
						body: 'Service Failed',
						timeOut: 3000
				});
		});
	}
	
	$scope.edittbdata = function(){
		if($scope.rowSelected > 0){
			 var reqObj = $scope.tbdata.filter(function(tbdataObj){
				return tbdataObj.editEnable;
			 });
			 angular.forEach(reqObj,function(v,k){
					delete reqObj[k].editEnable;
			 });
			listOfValuesService.updateListOfValues(reqObj).then(function(reponseObj){
				listOfValuesService.getListOfValues().then(handleSuccess, handleError);
				angular.forEach($scope.tbdata,function(tbdataObj,key){
					tbdataObj.editEnable = false;
				});
				toaster.clear();
				toaster.pop({
						type: 'success',
						body: 'List Of Vlaues Records Updated successfully',
						timeOut: 3000
				});
				$scope.rowSelected = 0;
			},function(errorObj){
				toaster.clear();
				toaster.pop({
						type: 'Error',
						body: 'Service Failed',
						timeOut: 3000
				});
			});
			
		}else{
			$scope.errorMsg = "Select Records to be Updated"
		}
	}
	
	$scope.deletetbdata = function(){
		if($scope.rowSelected > 0)
		{
			var reqObj = $scope.tbdata.filter(function(tbdataObj){
				return tbdataObj.editEnable;
			 });
			 angular.forEach(reqObj,function(v,k){
				delete reqObj[k].editEnable;
			 });
			listOfValuesService.deleteListOfValues(reqObj).then(function(reponseObj){
				listOfValuesService.getListOfValues().then(handleSuccess, handleError);
				toaster.clear();
				toaster.pop({
						type: 'success',
						body: 'List Of Values Records deleted successfully',
						timeOut: 3000
				});
				$scope.rowSelected = 0;
				
			},function(errorObj){
				toaster.clear();
				toaster.pop({
						type: 'Error',
						body: 'Service Failed',
						timeOut: 3000
				});
			});
		 } else{
			$scope.errorMsg = "Select Records to be Deleted.";
		}	 
		
	}
	
	$scope.exporttbdata = function(){
		listOfValuesService.getListOfValues().then(function(dataObj) {
			JSONToCSVConvertor.JSONToCSVConvertor(dataObj,"","list of values",true);
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});		
	}
	
	/*$scope.$watch('newRec["Created Date"]', function (newValue) {
	if(newValue && angular.isDate(newValue))
    $scope.newRec["Created Date"] = $filter('date')(newValue, 'dd/MM/yyyy'); 
	});

	$scope.$watch('newRec["Modified Date"]', function (newValue) {
		if(newValue && angular.isDate(newValue))
		$scope.newRec["Modified Date"] = $filter('date')(newValue, 'dd/MM/yyyy'); 
	});*/
	
	function init(){
		$scope.header = true;
		$rootScope.isFooterFixed = false;
		listOfValuesService.getListOfValues().then(handleSuccess, handleError)
	}
	
	function handleSuccess(responseObj){
		$scope.tbdata = responseObj;
	}
	
	function handleError(errorObj){
		console.log("error in calling service - stratum Info");
	}
	
	$scope.$on('$destroy', function() {
		listOfValuesService.callExitprocs();
	});	
	
}]);



