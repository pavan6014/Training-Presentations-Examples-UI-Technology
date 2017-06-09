attApp.controller("stratumInfoController",['$scope','$rootScope','stratumInfoService','JSONToCSVConvertor','toaster',function($scope,$rootScope,stratumInfoService,JSONToCSVConvertor,toaster){
	
	$scope.tbHeaders = {
		'company':'Company',
		'stratum':'Stratum',
		'marketSegment': 'Market Segment',
		'sampleSize': 'Annual Sample Size',
		'targetValid': 'Target Valids',
		'classification': 'Classification',
		'logoName': 'Logo Name'
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
		var exportObj = [];
		stratumInfoService.getStratumInfoList().then(function(responseObj){
			angular.forEach(responseObj,function(obj,key){
				var stratumObj = {};
				stratumObj.company = obj.designStrInfoCompId.company;
				stratumObj.stratum = obj.designStrInfoCompId.stratum;				
				delete obj.designStrInfoCompId;
				 angular.forEach(obj,function(value,key){
					stratumObj[key] = value;
				}); 
				exportObj.push(stratumObj);
			});
			JSONToCSVConvertor.JSONToCSVConvertor(exportObj,"","Stratum Report",true);
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
		stratumInfoService.getStratumInfoList().then(handleSuccess, handleError)
	}
	
}]);