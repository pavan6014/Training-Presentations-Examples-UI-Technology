attApp.controller('updateWorkstationProductListsController', ['$rootScope', '$scope', 'updateWorkstationProductListsService', 'sampleRecordingService','$location',  function($rootScope, $scope, updateWorkstationProductListsService, sampleRecordingService, $location) {
	
	$scope.getStratumInfo = function(){	
		updateWorkstationProductListsService.getStratumInfo().then(function(dataObj) {		
			$scope.stratumInfo = dataObj;		
			$scope.stratumName = $scope.stratumInfo[0].Stratum;	
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});		
	}	
	$scope.populatedProductGroups = function(){		
	
		updateWorkstationProductListsService.populatedProductGroups().then(function(dataObj) {			
			$scope.productGroups = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});	

		$scope.productAndActivityCommonList = {
			"colOneCommonData": [
				{	
					"listType": "activity",
					"listHeader": "Common Time",
					"listData": ["Greeting/Closing", "Customer Information", "CPNI Disclosure", "Det Addl Needs/Fact Find", "Other Common", "Boss Notes"]
				}
			]
		};		
	$scope.selectedGroupName = $scope.productAndActivityCommonList.colOneCommonData[0].listHeader;
		
	sampleRecordingService.getProductAndActivityList().then(function(dataObj) {
			$scope.productAndActivityList = dataObj; 
			$scope.allProductAndActivityList = [];
			$scope.allProductAndActivityListWithHeader = [];
			var activityList = {};
			activityList['key'] = $scope.productAndActivityCommonList.colOneCommonData[0].listHeader;
			activityList['value'] = $scope.productAndActivityCommonList.colOneCommonData[0].listData;
			$scope.allProductAndActivityListWithHeader.push(activityList);
			
			$scope.allProductAndActivityList = $scope.allProductAndActivityList.concat($scope.productAndActivityCommonList.colOneCommonData[0].listData);
			angular.forEach(dataObj, function(pAValue, pAKey) {
				console.log(pAKey + ': ' + pAValue);
				for( var i=0; i < pAValue.length; i++){
					activityList = {};
					$scope.allProductAndActivityList = $scope.allProductAndActivityList.concat(pAValue[i].listData);				
					activityList['key'] = pAValue[i].listHeader;
					activityList['value'] = pAValue[i].listData;
					$scope.allProductAndActivityListWithHeader.push(activityList);
				}
			});			
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
	
	}	
	$scope.groupButtonAction = function(){	
		$scope.duplicateDropdownVisible = false;
		$scope.groupDropdownVisible = false;	
	}
	$scope.productGroupAction = function(){
		$scope.duplicateDropdownVisible = false;	
		$scope.groupDropdownVisible = true;	
	}
	
	$scope.duplicateButtonAction = function(){
		alert("1) Add the Stratum to Design - Stratum Info table.  2) Add the Office to the Office List.  3) Choose the Screen layout you want to duplicate from first. 4) Then Choose the Stratum from the list below to duplicate to)");
		$scope.duplicateDropdownVisible = true;
	}
	$scope.submitChanges = function(){
		$scope.duplicateDropdownVisible = false;
		//$route.reload();	
		alert("User selected "+ JSON.stringify($scope.selectedGroupEntryObj) + " updated");
	}
	$scope.productLink = function(){		
		$location.path('/update-products');
	}
	$scope.selectGroupEntry = function(index){
		$scope.selectedGroupEntryIndex = index;
		$scope.isGroupEntrySelected = true;
		
	}
	$scope.selectGroupEntryName = function(groupEntry, index){
		$scope.selectedGroupEntryIndex = index;
		$scope.isGroupEntrySelected = true;
		$scope.selectedGroupEntryObj = groupEntry;
		console.log("group entry : "+JSON.stringify($scope.selectedGroupEntryObj));
	}
	
	
	init();
	function init(){	
		$scope.groupDropdownVisible = true;
		$scope.duplicateDropdownVisible = false;
		$scope.getStratumInfo();
		$scope.populatedProductGroups();
	} 
}]);