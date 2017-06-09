attApp.controller("stratumDefinitionController",['$scope','$rootScope','stratumDefinitionService','JSONToCSVConvertor','toaster','$location','$window',function($scope,$rootScope,stratumDefinitionService,JSONToCSVConvertor,toaster,$location,$window){
	
	$scope.tbHeaders = {
		'company':'Company',
		'pds_rc':'Pds Rc',
		'city': 'City',
		'cllc': 'CLLC',
		'emps': 'Emps',
		'stratum': 'Stratum',
		'language': 'Language',
		'modified_date': 'Modified Date'
	}
	
	$scope.newStratRec = {};
	init();
	$scope.stratumItem = {};
	$scope.rowSelected = 0;
	
	$scope.selectCheckbox = function(selected){
		if(selected)
			$scope.rowSelected++;
		else
			$scope.rowSelected--;
		$scope.errorMsg = "";
	}
	
		
	$scope.exportToPdf = function(){
	$window.open("#/stratum-definition-report_pdf");	
	}
	
	$scope.add = function (dataObj) {
		stratumInfoService.addRecStratumInfoList(dataObj.newStratRec).then(function handleSuccess(responseObj){
			$scope.stratumInfoList.splice(0,0,dataObj.newStratRec);
			$scope.newStratRec = {};
		}, function handleError(){
			
		});
	};
	
	$scope.editStratumData = function(){
		if($scope.rowSelected > 0){
			 var reqObj = $scope.stratumInfoList.filter(function(stratumObj){
					return stratumObj.editEnable;
		     });
			stratumInfoService.updateStratumInfoList(reqObj).then(function(responseObj){
				angular.forEach($scope.stratumInfoList,function(stratumObj,key){
					stratumObj.editEnable = false;
				});
				toaster.clear();
				toaster.pop({
						type: 'success',
						body: 'Stratum Records Updated successfully',
						timeOut: 3000
				});
				$scope.rowSelected = 0;
		    },handleError);  
		}else{
			$scope.errorMsg = "Select Records to be Updated.";
		}
		
	}
	
	$scope.delStratumData = function(){
		if($scope.rowSelected > 0){
			var reqObj = $scope.stratumInfoList.filter(function(stratumObj){
				return stratumObj.editEnable;
			});
			stratumInfoService.delStratumInfoList(reqObj).then(function(responseObj){
				$scope.stratumInfoList = $scope.stratumInfoList.filter(function(stratumObj){
					return !stratumObj.editEnable;
				});
				$scope.rowSelected = 0;
				toaster.clear();
				toaster.pop({
					type: 'success',
					body: 'Stratum Records Deleted successfully',
					timeOut: 5000
				});
			},handleError);
		}
		else{
			$scope.errorMsg = "Select Records to be Deleted.";
		}
	}

	$scope.exportStratumData = function(){
		stratumDefinitionService.getstratumDefinitionList().then(function(responseObj){
			JSONToCSVConvertor.JSONToCSVConvertor(responseObj,"","stratum_definition",true);
		}, handleError)
	}
	
	$scope.exportUniverseTableData = function(){
		stratumDefinitionService.getBrowseUniverseTableList().then(function(responseObj){
			JSONToCSVConvertor.JSONToCSVConvertor(responseObj,"","Browse_Universe_Table",true);
		}, handleError)
	}
	
	function handleSuccess(responseObj){
		$scope.stratumInfoList = responseObj;
	}
	
	function handleError(errorObj){
		toaster.clear();
		toaster.pop({
				type: 'error',
				body: 'Service Failed',
				timeOut: 3000
		});
	}
	
	function init(){
		$rootScope.isFooterFixed = false;
		stratumDefinitionService.getstratumDefinitionList().then(handleSuccess, handleError);
		var path = $location.path();
		if(path=='/stratum-definition'){
			$rootScope.hideheader = false;
			$rootScope.hidefooter = false;
		}else{
			$rootScope.hideheader = true;
			$rootScope.hidefooter = true;
		}


	}
	
}]);