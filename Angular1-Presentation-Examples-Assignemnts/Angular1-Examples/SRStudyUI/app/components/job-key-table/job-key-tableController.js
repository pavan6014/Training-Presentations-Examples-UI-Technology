attApp.controller('jobKeyTableController', ['$rootScope', '$scope', '$location','jobKeyTableService','JSONToCSVConvertor','toaster',function($rootScope, $scope, $location,jobKeyTableService,JSONToCSVConvertor,toaster) {
	
	init();
	$scope.tbheaders = ["Company","Salary Band Wage Sched","Job Key","Dominant Function Code"];
	$scope.newRec = {};
	$scope.rowSelected = 0;
	$scope.selectCheckbox = function(selected){
		if(selected)
			$scope.rowSelected++;
		else
			$scope.rowSelected--;
		$scope.errorMsg = "";
	}
	
	function isRowSelected(){
		$scope.rowSel = $scope.tbdata.filter(function(tbdataObj){
			return tbdataObj.editEnable;
		});
	}
	
	$scope.add = function(dataObj){
		jobKeyTableService.addJobKeyTable(dataObj.newRec).then(function handleSuccess(responseObj){
			//jobKeyTableService.getJobKeyTable().then(handleSuccess, handleError);
			$scope.tbdata.splice(0,0,dataObj.newRec);		
			$scope.newRec = {};
			toaster.clear();
			toaster.pop({
					type: 'success',
					body: 'Job Key Added successfully',
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
			jobKeyTableService.updateJobKeyTable(reqObj).then(function(reponseObj){
				jobKeyTableService.getJobKeyTable().then(handleSuccess, handleError);
				angular.forEach($scope.tbdata,function(tbdataObj,key){
					tbdataObj.editEnable = false;
				});
				toaster.clear();
				toaster.pop({
						type: 'success',
						body: 'Job Key Updated successfully',
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
			$scope.errorMsg = "Select Records to be Updated.";
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
			jobKeyTableService.deleteJobKeyTable(reqObj).then(function(reponseObj){
				jobKeyTableService.getJobKeyTable().then(handleSuccess, handleError);
				toaster.clear();
				toaster.pop({
						type: 'success',
						body: 'Job Key Table Records deleted successfully',
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
			$scope.errorMsg = "Select Records to be Deleted.";
		}
	}
	
	$scope.exporttbdata = function(){
		jobKeyTableService.getJobKeyTable().then(function(dataObj) {
			JSONToCSVConvertor.JSONToCSVConvertor(dataObj,"","Universe Extract Table",true);
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});		
	}
	
	function handleSuccess(responseObj){
		$scope.tbdata = responseObj;
	}
	
	function handleError(errorObj){
		console.log("error in calling service - stratum Info");
	}
	
	function init(){
		$scope.header = true;
		$scope.errorMsg = "";
		$rootScope.isFooterFixed = false;
		jobKeyTableService.getJobKeyTable().then(handleSuccess, handleError)
	}

}]);
