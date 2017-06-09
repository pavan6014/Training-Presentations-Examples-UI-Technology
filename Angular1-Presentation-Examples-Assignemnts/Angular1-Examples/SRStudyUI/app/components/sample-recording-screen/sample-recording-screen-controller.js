attApp.controller('sampleRecordingScreenController', ['$rootScope', '$scope', '$location', '$window', '$timeout', 'sampleRecordingService', '$http', '$filter', function($rootScope, $scope, $location, $window, $timeout, sampleRecordingService, $http, $filter) {
	// if (Object.keys($rootScope.selectedAgentDataObj).length == 0) {
		// $location.path("/agentSelection");
		// return;
	// }
	var startTimeInSec = (new Date()).getTime();
	$scope.startTime = $filter('date')(startTimeInSec, 'mediumTime');
	$scope.sampleObj = {};
	$scope.sampleObj.sampleDate = "05/23/2016";
	$scope.sampleObj.employeeName = "James Cook";
	$scope.sampleObj.office = "ML Road";
	$scope.sampleObj.stratum = "Business";
	$scope.sampleObj.status = "Flagged";
	$scope.sampleObj.company = "ATT";
	$rootScope.isFooterFixed = false;
	$scope.isNoteVisible = false;
	$scope.isStrtBtnActv = true;
	$scope.recordingCounter = 0;
	$scope.occuranceCounter = 0;
	$scope.isDeletedOnce = false;
	$scope.selectedOccurenceDetails = {};
	$scope.isSampleEditEnabled = false;
	$scope.enableEditBtn = false;
	$scope.isSelected =false;
	$scope.stratumIdentifier= $rootScope.selectedAgentDataObj.stratumIdentifier;
	$scope.validationMsg = "";
	$scope.disableTillStartFlag = true;
	//remove aft service integration
	$scope.selectedOccurenceDetails.orderType = "Offline";
	$scope.correctProd = false;
	
	if($rootScope.navigatedFrom == 'Sample Correction'){
		sampleRecordingService.getOccuranceList().then(function(dataObj) {
			$scope.occurenceList = dataObj;
			$scope.occuranceCounter = $scope.occurenceList.length + 1;
			$scope.isSampleEditEnabled = true;
			$scope.occurence = $scope.occurenceList[0];
			$scope.selectedAreaCode = $scope.occurenceList[0].areaDetails;
			$scope.prefix = $scope.occurenceList[0].prefix;
			$scope.selectedOccurenceDetails = $scope.occurenceList[0];
			for(var i = 0; i < $scope.occurenceList.length; i++){
				if($scope.occurenceList[i].listenedCallDetailsList[0].listHeader != 'Offline'){
					$scope.recordingCounter++;
				}
			}
			console.log(JSON.stringify($scope.occurenceList));
		}, function(errorObj) {
			console.log('Error in fetching sample list. '+errorObj.status);
		});
	}else{
		$scope.occurenceList = [];
	}
	$scope.productAndActivityCommonList = {
		"colOneCommonData": [
			{	
				"listType": "activity",
				"listHeader": "Common Time",
				"listData": [{"listName" : "Greeting/Closing", "desc" : "Greeting/Closing Description"},{"listName" : "Customer Information", "desc":"Customer Information Description"},{"listName":"CPNI Disclosure","desc":"CPNI Disclosure Description"}]
			}
		]
	};
	
	$scope.sampledCompany = ""
	$scope.bufferTime = 0;
	var bufferStopWatch = null;
	$scope.startBufferTime = function(isBufferBtnClicked){
		if(isBufferBtnClicked){
			$scope.enableEditBtn = true;
			offAllOnSwitch();
		}else{
			bufferStopWatch = $timeout(function() {
				$scope.bufferTime++;
				$scope.startBufferTime(false);
			}, 1000);
		}
		
	}
	
	function offAllOnSwitch(){
		$timeout(function() {
			angular.element('.switch_selected_a_p>.switch.checked').trigger('click');
		}, 0);
	}
	
	$scope.stopAndResetBufferTime = function(){
		$timeout.cancel(bufferStopWatch);
		bufferStopWatch = null;
		$scope.bufferTime = 0;
	}
	
	$scope.getAreaCodeList = function(){
		console.log("Inside getAreaCodeList")
		sampleRecordingService.getAreaCodeList().then(function(dataObj) {
			console.log(dataObj)
			$scope.areaCodeList = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});
	}
	
	$scope.getProductActivityList = function(){
		sampleRecordingService.getProductAndActivityList().then(function(dataObj) {
			$scope.productAndActivityList = dataObj; 
			$scope.allProductAndActivityList = [];
			for(var k=0; k < $scope.productAndActivityCommonList.colOneCommonData[0].listData.length; k++){
				$scope.allProductAndActivityList.push($scope.productAndActivityCommonList.colOneCommonData[0].listData[k]);
			}
			angular.forEach(dataObj, function(pAValue, pAKey) {
				console.log(pAKey + ': ' + pAValue);
				for( var i=0; i < pAValue.length; i++){
					pAValue[i].listData = $filter('productfilter')(pAValue[i].listData,'listName');
					for(var j=0; j < pAValue[i].listData.length; j++){
						$scope.allProductAndActivityList.push(pAValue[i].listData[j]);
					}
				}
			});
			console.log("ALL Product and activity : "+JSON.stringify($scope.allProductAndActivityList));
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
	
	}
	
	$scope.startOfflineActivity = function(isCalledFromView){
		if(isCalledFromView){
			$scope.pushOrUpdateOccurencesOfSample();
			console.log($scope.occurenceList);
			$scope.selectedOccurenceDetails = {};
		}else{
			
		}
		$scope.selectedAreaCode = {};;
		$scope.prefix = '000';
		$scope.isStrtBtnActv = true;
		$scope.occuranceCounter++;
		$scope.isNoteVisible = false;
		var occurenceObj = {};
		occurenceObj.flagged = 'NO';
		occurenceObj.occurenceNumber = $scope.occuranceCounter;
		occurenceObj.notes = '';
		occurenceObj.orderType = "Offline";
		occurenceObj.listenedCallDetailsList = [];
		var selectedData = {};
		selectedData.listHeader = "Offline";
		selectedData.listType = 'activity';
		selectedData.listData = 'offline';
		selectedData.highlightVersion = false;
		selectedData.switchStatus = false;
		selectedData.version = "select";
		selectedData.diposition = '';
		selectedData.time = 0;
		selectedData.prior = '';
		selectedData.quantity = 0;
		selectedData.ot = false;
		$scope.stopAndResetBufferTime(); // reset buffer time to zero
		occurenceObj.listenedCallDetailsList.push(selectedData);
		$scope.selectedOccurenceDetails = occurenceObj;
		$scope.disableTillStartFlag = true;
	}
	
	function init(){
		$window.scrollTo(0, 0);
		$scope.getAreaCodeList();
		$scope.getProductActivityList();
		$scope.startOfflineActivity(false);
		$scope.getDispositionList();
		$scope.errorMsg = "";	
	}
	
	
	
	$scope.selectProductAndActivity = function(productAndActivity, header, type){
		var selectedData = {};
		selectedData.listHeader = header;
		selectedData.listType = type;
		selectedData.listData = productAndActivity.listName;
		selectedData.version = "select";
		selectedData.highlightVersion = false;
		selectedData.switchStatus = false;
		selectedData.diposition = '';
		selectedData.time = $scope.bufferTime;
		selectedData.prior = '';
		selectedData.quantity = 0;
		selectedData.ot = false;
		$scope.correctProd = false;
		$scope.stopAndResetBufferTime(); // reset buffer time to zero
		if($scope.selectedOccurenceDetails == undefined || $scope.selectedOccurenceDetails == {} || $scope.selectedOccurenceDetails == null || Object.getOwnPropertyNames($scope.selectedOccurenceDetails).length === 0){
			var occurenceObj = {};
			occurenceObj.flagged = 'NO';
			occurenceObj.occurenceNumber = $scope.occuranceCounter;
			occurenceObj.notes = '';
			occurenceObj.orderType = "TF";
			occurenceObj.listenedCallDetailsList = [];
			occurenceObj.listenedCallDetailsList.push(JSON.parse(JSON.stringify(selectedData)));
			$scope.selectedOccurenceDetails = occurenceObj;
		}else{
			if($scope.selectedOccurenceDetails.orderType == "Offline"){// for offline activity, product/activity can't be added
				$scope.errorMsg = "Cannot add product/activity for offline activity";
			}else{
				var isArrayCotainsSelectedItem = false;
					var count = 0;		
					var alertHighlightVersion = false;
				 for(var i=0; i < $scope.selectedOccurenceDetails.listenedCallDetailsList.length; i++){
					if($scope.selectedOccurenceDetails.listenedCallDetailsList[i].listHeader == header && $scope.selectedOccurenceDetails.listenedCallDetailsList[i].listData == productAndActivity.listName){
						isArrayCotainsSelectedItem = true;
						$scope.errorMsg = $scope.selectedOccurenceDetails.listenedCallDetailsList[i].listData+" Product/actvity is already added";
						$scope.selectedOccurenceDetails.listenedCallDetailsList[i].switchStatus = true;
						count++;						
					}
					if($scope.selectedOccurenceDetails.listenedCallDetailsList[i].version == 'select'){
						for(var j=0;j<$scope.allProductAndActivityList.length;j++){
						if($scope.allProductAndActivityList[j].listName == $scope.selectedOccurenceDetails.listenedCallDetailsList[i].listData){
						if($scope.allProductAndActivityList[j].version && $scope.allProductAndActivityList[j].version.length>0){
							alertHighlightVersion = true;
					}
				break;
				}
			}
						$scope.selectedOccurenceDetails.listenedCallDetailsList[i].highlightVersion = true;
					}
				} 
				//if(!isArrayCotainsSelectedItem){
				//	if(count <= 2){ //keeping this count code just in case if we need any restriction in future on count we could remove this if the requirements are finalized.
				if(count<1 || (productAndActivity.version && productAndActivity.version.length!=0))
				{	
					if(alertHighlightVersion){
					$scope.errorMsg = "Please select version.";
					}else{
					$scope.errorMsg = "";
					}					
					$scope.selectedOccurenceDetails.listenedCallDetailsList.push(JSON.parse(JSON.stringify(selectedData)));
				}	
				//}
			}
		}
	}

	$scope.textChange = function(idName){	
		angular.element(document.querySelector("#"+idName)).removeClass('prefixColorBefore');
		angular.element(document.querySelector("#"+idName)).addClass('prefixColor');
		$scope.validationMsg = "";
	}
	$scope.selectRadio = function(){
	angular.element(document.querySelector("#radioGroup")).removeClass('border-yellow');
	angular.element(document.querySelector("#radioGroup")).addClass('border-none');
		
	}
	
	$scope.startListeningNewRecording = function(){
		$scope.isStrtBtnActv = false;
		$scope.stopAndResetBufferTime();
		$scope.isNoteVisible = false;
		$scope.disableTillStartFlag = false;
		// saving previous selected and edited data
		$scope.pushOrUpdateOccurencesOfSample();
		$scope.recordingCounter++;
		$scope.occuranceCounter++;
		$scope.errorMsg = "";
		$scope.selectedOccurenceDetails = {};
		$timeout(function() {
			angular.element('ul li.common_a_p_li:nth-child(1)').trigger('click');
			$scope.selectedOccurenceDetails.orderType = false;
			$scope.getDispositionList();
		}, 0);
		
	}
	
	$scope.calculateTotalNoOfCall = function(){
		alert('Number of Calls for this session = '+ $scope.recordingCounter);
	}
	
	$scope.showNoteTextArea = function(){
		if($scope.isNoteVisible){
			$scope.isNoteVisible = false;
		}else{
			$scope.isNoteVisible = true;
		}
	}
	
	$scope.prevOccurence = function(){
		var occurenceNumber  = $scope.occurence.occurenceNumber;
		if(occurenceNumber > 1){
			$scope.occurence = $scope.occurenceList[occurenceNumber - 2];
			$scope.selectedOccurenceDetails = $scope.occurence;
			$scope.selectedAreaCode = $scope.occurence.areaDetails;
			$scope.prefix = $scope.occurence.prefix;
		}else{
			// display error or disable previous btn
		}
	}
	
	$scope.nextOccurence = function(){
		var occurenceNumber  = $scope.occurence.occurenceNumber;
		if(occurenceNumber > 0 && occurenceNumber < $scope.occurenceList.length){
			$scope.occurence = $scope.occurenceList[occurenceNumber];
			$scope.selectedOccurenceDetails = $scope.occurence;
			$scope.selectedAreaCode = $scope.occurence.areaDetails;
			$scope.prefix = $scope.occurence.prefix;
		}else{
			// display error or disable next btn
		}
	}
	
	$scope.onChangeOfOccurence = function(occurence){
		$scope.selectedOccurenceDetails = occurence;
		$scope.selectedAreaCode = occurence.areaDetails;
		$scope.prefix = occurence.prefix;
	}
	
	$scope.showSampleDetailsPopUp = function(){
		var valid = $scope.validateOccurence();	
		if(valid){		
		var stopTimeInSec = (new Date()).getTime();
		$scope.stopTime = $filter('date')(stopTimeInSec, 'mediumTime');
		$scope.totalWorkSeconds = stopTimeInSec - startTimeInSec;
		$('#sampleDetailsModal').modal('show');
		$scope.$broadcast('stopAllTimer');
		}
	}
	
	$scope.pushOrUpdateOccurencesOfSample = function(){
		var isOccurenceAvlbl = false;
		$scope.selectedOccurenceDetails.areaDetails = $scope.selectedAreaCode;
		$scope.selectedOccurenceDetails.prefix = $scope.prefix;
		if($scope.occurenceList.length == 0){
			$scope.occurenceList.push(JSON.parse(JSON.stringify($scope.selectedOccurenceDetails)));
			return;
		}else{
			for(var i=0; i < $scope.occurenceList.length; i++ ){ // updating the existing occurence
				if($scope.occurenceList[i].occurenceNumber == $scope.selectedOccurenceDetails.occurenceNumber){
					isOccurenceAvlbl = true;
					break;
				}
			}
			if(isOccurenceAvlbl){
				$scope.occurenceList[i] = JSON.parse(JSON.stringify($scope.selectedOccurenceDetails));
			}else{
				$scope.occurenceList.push(JSON.parse(JSON.stringify($scope.selectedOccurenceDetails)));
			}
		}
	}
	$scope.deleteCurrentOccurence = function(){
		// delete current occurence and assign the total time spend on the occurrence to the previous offline occurence(most of the cases) 
		if($scope.isDeletedOnce){
			$scope.errorMsg = "You Cannot delete this Occurrence";
		}else{
			$("#deleteConfirmDialog").modal();
		}	
	}
	
	$scope.confirmDelOccurence = function(){
		$scope.recordingCounter--;
		$scope.occuranceCounter--;
		var totalTime = 0;
		for(var i=0; i<$scope.selectedOccurenceDetails.listenedCallDetailsList.length; i++){
			totalTime += $scope.selectedOccurenceDetails.listenedCallDetailsList[i].time;
		}
		$scope.occurenceList[$scope.occuranceCounter-1].listenedCallDetailsList[0].time += totalTime;
		$scope.selectedOccurenceDetails = $scope.occurenceList[$scope.occuranceCounter-1];
		$scope.isStrtBtnActv = true;
		$scope.isDeletedOnce = true;
		$("#deleteConfirmDialog .cancel").click();
	}
	// $scope.onChangeOfActivity = function(newActivity, oldActivity){
		// alert('newActivity : '+newActivity+' ; oldActivity : '+oldActivity);
		// $scope.correctedActivity = newActivity;
	// }
	$scope.getDispositionList = function(){
		sampleRecordingService.getDispositionList($scope).then(function(responseObj){
		$scope.dispositionlist = [];
				if($scope.selectedOccurenceDetails.orderType!='Offline' && $scope.selectedOccurenceDetails.orderType)
					$scope.dispositionlist = responseObj.orderType[$scope.selectedOccurenceDetails.orderType];
				else{
				angular.forEach(responseObj.orderType,function(orderType,key){
					angular.forEach(orderType,function(disposition,key){
						if($scope.dispositionlist.indexOf(disposition)==-1)
						$scope.dispositionlist.push(disposition);
						});
					});
				}
		},function(errorObj){
			
		});
	}
	
	$scope.$on("sample-recording-duplicateProd",function(eve,duplicate){
	console.log("getting broadcast sample-recording-duplicateProd for "+JSON.stringify(duplicate));
	var isArrayCotainsSelectedItem = false;
		var count = 0;
		var registerIndex = [];
			for(var i=0; i < $scope.selectedOccurenceDetails.listenedCallDetailsList.length; i++){
				if($scope.selectedOccurenceDetails.listenedCallDetailsList[i].listHeader == duplicate.listHeader && $scope.selectedOccurenceDetails.listenedCallDetailsList[i].listData == duplicate.listData && $scope.selectedOccurenceDetails.listenedCallDetailsList[i].version == duplicate.version){
						isArrayCotainsSelectedItem = true;
						registerIndex.push(i);
						count++;
						
					}
				} 
				if(count>1)	{		
				//adding time
					$scope.selectedOccurenceDetails.listenedCallDetailsList[registerIndex[0]].time += parseInt($scope.selectedOccurenceDetails.listenedCallDetailsList[registerIndex[1]].time); 
				//adding priority	
					/*$scope.selectedOccurenceDetails.listenedCallDetailsList[registerIndex[0]].prior += parseInt($scope.selectedOccurenceDetails.listenedCallDetailsList[registerIndex[i]].prior); */
				//adding quantity	
					$scope.selectedOccurenceDetails.listenedCallDetailsList[registerIndex[0]].quantity += parseInt($scope.selectedOccurenceDetails.listenedCallDetailsList[registerIndex[1]].quantity);
					$scope.selectedOccurenceDetails.listenedCallDetailsList[registerIndex[0]].diposition = '';
					$scope.selectedOccurenceDetails.listenedCallDetailsList[registerIndex[0]].switchStatus = true;
					$scope.selectedOccurenceDetails.listenedCallDetailsList.splice(registerIndex[1],1);
				}
					
			
	});
	
	$scope.goToDashboard = function(){
		$("#sampleDetailsModal").modal('hide');
		$timeout(function(){
			$location.path('/admin-dashboard');
		},200)
	}
	
	$scope.validateOccurence = function(){
		$scope.validate = true;
		
		if(($scope.isEmptyObject($scope.selectedAreaCode)) && $scope.prefix==""){
		$scope.validationMsg = "Please select area code and add prefix";
		}else if(($scope.isEmptyObject($scope.selectedAreaCode)) && $scope.prefix.length<3){
		$scope.validationMsg = "Please select area code and prefix should be minimum 3 digits";
		}else if(($scope.isEmptyObject($scope.selectedAreaCode))){
		$scope.validationMsg = "Please select area code";
		}else if($scope.prefix==""){
		$scope.validationMsg = "Please add prefix";
		}else if($scope.prefix.length<3){
		$scope.validationMsg = "Prefix should be minimum 3 digits";
		}
		else{
		$scope.validationMsg = "";
		}
		
		$scope.validationMsgOrderType = "Please select order type";
		var dispositionNotselected = false;
		var versionNotselected = false;

		for(var i=0; i < $scope.selectedOccurenceDetails.listenedCallDetailsList.length; i++){
				
			var versionList = [];
			for(var j=0;j<$scope.allProductAndActivityList.length;j++){
				if($scope.allProductAndActivityList[j].listName == $scope.selectedOccurenceDetails.listenedCallDetailsList[i].listData){
					if($scope.allProductAndActivityList[j].version && $scope.allProductAndActivityList[j].version.length>0){
						versionList=$scope.allProductAndActivityList[j].version;
					}
				break;
				}
			}
				
				if($scope.selectedOccurenceDetails.listenedCallDetailsList[i].diposition == ""){
				$scope.selectedOccurenceDetails.listenedCallDetailsList[i].alertDisposition = true;
						$scope.errorMsg = "Please select disposition";
						dispositionNotselected = true;
					}
				
					if($scope.selectedOccurenceDetails.listenedCallDetailsList[i].version == "select" && versionList.length>0){
						$scope.selectedOccurenceDetails.listenedCallDetailsList[i].highlightVersion = true;
						$scope.errorMsg = "Please select version";
						versionNotselected = true;
					}
					
				}

			if(dispositionNotselected && versionNotselected){
			$scope.errorMsg = "Please select version and disposition";
			}else if(dispositionNotselected){
			$scope.errorMsg = "Please select disposition";
			}else if(versionNotselected){
			$scope.errorMsg = "Please select version";
			}else{
			$scope.errorMsg = "";
			}

	
	if($scope.validationMsg != "" || $scope.errorMsg !=""){
	return false;
	}
	else{
	return true;
	}
		
		
	}
	
	$scope.editSample = function(){
		$scope.isSampleEditEnabled = true;
	}
	
	$scope.onClickOfProductGroup = function(){
		alert("Please Select a Valid Product");
		$scope.correctProd = false;
	}
    
     $scope.changeOccurenceStatus = function(){
        $scope.selectedOccurenceDetails.flagged = "YES";
    }
	
	$scope.selectedprod = function(obj){
		$scope.selectedProdName = obj;
	}
	
	$scope.isEmptyObject = function(obj) {
		return angular.equals({},obj)
	};
	init();
}]);