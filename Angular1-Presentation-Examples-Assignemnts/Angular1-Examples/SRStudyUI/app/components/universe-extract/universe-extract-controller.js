attApp.controller('universeExtractController', ['$rootScope', '$scope', '$location','universeExtractService','JSONToCSVConvertor','toaster','errorHandlerService','blockUI',function($rootScope, $scope, $location,universeExtractService,JSONToCSVConvertor,toaster,errorHandlerService,blockUI) {
	
	$scope.tbheaders = ["Company","Extract Code","Life Line Company"];
	$scope.rowSelected = 0;
	$scope.newRec = {};
	
	$scope.add = function(dataObj){
		universeExtractService.addUniverseExtract(dataObj.newRec).then(function handleSuccess(responseObj){
			$scope.tbdata.splice(0,0,dataObj.newRec);		
			$scope.newRec = {};
		}, function handleError(){
			
		});
	}
	
	$scope.edittbdata = function(){
		if($scope.rowSelected > 0){
			 var reqObj = $scope.tbdata.filter(function(tbdataObj){
				return tbdataObj.editEnable;
			 });
			universeExtractService.updateUniverseExtract(reqObj).then(function(reponseObj){
				angular.forEach($scope.tbdata,function(tbdataObj,key){
					tbdataObj.editEnable = false;
				});
				errorHandlerService.displayToast('success','Universe Extract Records Updated successfully');
				$scope.rowSelected = 0;
			},function(errorObj){
				universeExtractService.displayToast('Error','Service Failed');
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
			universeExtractService.deleteUniverseExtract(reqObj).then(function(reponseObj){
				$scope.tbdata = $scope.tbdata.filter(function(tbdataObj){
					return !tbdataObj.editEnable;
				});
				toaster.clear();
				toaster.pop({
						type: 'success',
						body: 'Universe Extract Records deleted successfully',
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
			$scope.errorMsg = "Select Records to be Deleted";
		}	 
		
	}
	
	$scope.exporttbdata = function(){
		universeExtractService.getUniverseExtract().then(function(dataObj) {
			JSONToCSVConvertor.JSONToCSVConvertor(dataObj,"","Universe Extract Table",true);
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});		
	}
	
	$scope.selectCheckbox = function(selected){
		if(selected)
			$scope.rowSelected++;
		else
			$scope.rowSelected--;
		$scope.errorMsg = "";
	}
	blockUI.start();
	init();
	function init(){
		$scope.header = true;
		$scope.errorMsg = "";
		$rootScope.isFooterFixed = false;
		universeExtractService.getUniverseExtract().then(handleSuccess, handleError)
	}	
	
	function handleSuccess(responseObj){
		$scope.tbdata = responseObj;
		blockUI.stop();
	}
	
	function handleError(errorObj){
		console.log("error in calling service - stratum Info");
		blockUI.stop();
	}

	$scope.$on('$destroy', function() {
		//call services for exit procedures
		universeExtractService.callExitprocs();
	});
	
}]);




