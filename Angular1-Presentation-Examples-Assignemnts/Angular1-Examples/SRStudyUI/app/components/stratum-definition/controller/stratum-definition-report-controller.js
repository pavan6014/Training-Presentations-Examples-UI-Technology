attApp.controller('stratumDefinitionReportController', ['$rootScope', '$scope', 'stratumDefinitionService' ,'$window', function($rootScope, $scope, stratumDefinitionService, $window) {

$scope.tbHeaders = {
		'company':'Company',
		'rc':'RC',
		'stratum': 'Stratum',
		'remark': 'Remark',
		'language': 'Language',
		'old_rc': 'Old RC',
		'office': 'Office',
		'recording_type': 'Recording Type',
		'new_rc':'New Rc',
		'job_title_code':'Job Title Code'/*,
		'activation_date':'Activation Date',
		'deactivation_date':'Deactivation Date'*/
	}

$scope.tbHeadersType = {
		'company':'text',
		'rc':'text',
		'stratum': 'select',
		'remark': 'text',
		'language': 'select',
		'old_rc': 'text',
		'office': 'text',
		'recording_type': 'select',
		'new_rc':'text',
		'job_title_code':'text',
		'activation_date':'date',
		'deactivation_date':'date'
	};

$scope.selectData = {};
$scope.selectData['stratum'] = ['stratum1','stratum2','stratum3','stratum4'];
$scope.selectData['language'] = ['language1','language2','language3','language4'];
$scope.selectData['recording_type'] = ['recording_type1','recording_type2','recording_type3','recording_type4'];

	
	$scope.colPercent = 100/Object.keys($scope.tbHeaders).length;
	
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
		stratumDefinitionService.getstratumDefinitionReportList().then(function(responseObj){
			JSONToCSVConvertor.JSONToCSVConvertor(responseObj,"","Stratum_definitions_Report_AIT_only",true);
		}, handleError)
	}
	
	//populating drop downs
	
	$scope.populatingDropDowns = function(){
		stratumDefinitionService.getstratumList().then(function(responseObj){
			$scope.selectData['stratum'] = responseObj;
		}, handleError);
		
		stratumDefinitionService.getlanguageList().then(function(responseObj){
			$scope.selectData['language'] = responseObj;
		}, handleError);
		
		stratumDefinitionService.getrecording_typeList().then(function(responseObj){
			$scope.selectData['recording_type'] = responseObj;
		}, handleError);
		
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
		stratumDefinitionService.getstratumDefinitionReportList().then(handleSuccess, handleError);
		/*we will call this when we get data from service
		$scope.populatingDropDowns();*/
		$rootScope.hideheader = false;
		$rootScope.hidefooter = false;
	}
	
}]);	
	
	