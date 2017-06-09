attApp.controller('sampleCorrectionController', ['$rootScope', '$scope', '$location', '$window', '$filter', '$timeout', 'sampleCorrectionService', function($rootScope, $scope, $location, $window, $filter, $timeout, sampleCorrectionService) {
	$scope.localVar = {};
	$scope.localVar.selectedSampleStatus = "";
	$scope.localVar.selectedSampleMonth = "05/01/2016";
	$scope.localVar.selectedAgentIndex = undefined;
	$scope.localVar.isGoToSampleBtnClicked = false;
	$scope.localVar.isSampleSelected = false;
	$scope.localVar.selectedSampleObj = {};
	$scope.localVar.hideSampleTable = true;
	$scope.localVar.isSampleMonthSelected = true;
	
	$scope.navigation = {};
	$scope.navigation.currentPage = 1;
	$scope.navigation.totalNumOfPage = 1;
	$scope.navigation.rowPerPage = 15;
	
	$scope.onChangeOfSampleMonthOrStatus = function(){
		if(!$scope.localVar.selectedSampleMonth || $scope.localVar.selectedSampleMonth.trim() == ""){
			$scope.localVar.isSampleMonthSelected = false;
			$scope.localVar.sampleList = [];
			$scope.localVar.isSampleSelected = false;
			$scope.localVar.hideSampleTable = true;
			$scope.localVar.selectedAgentIndex = undefined;
			$scope.localVar.selectedSampleObj = {};
			$rootScope.isFooterFixed = true;
		}else{
			console.log("Selected Sample Month : "+$scope.localVar.selectedSampleMonth);
			sampleCorrectionService.getSampleList().then(function(dataObj) {
				$scope.localVar.sampleList = dataObj;
				$rootScope.isFooterFixed = false;
				$scope.navigation.currentPage = 1;
				$scope.navigation.totalNumOfPage = Math.ceil($scope.localVar.sampleList.length/$scope.navigation.rowPerPage);
				$scope.localVar.isSampleSelected = false;
				$scope.localVar.hideSampleTable = false;
				$scope.localVar.selectedAgentIndex = undefined;
				$scope.localVar.selectedSampleObj = {};
			}, function(errorObj) {
				console.log('Error in fetching sample list.');
			});
		}
	}
	
	$scope.onChangeOfSampleStatus = function(){
		if($scope.localVar.sampleList && $scope.localVar.sampleList.length > 0){
			if($scope.localVar.selectedSampleStatus && $scope.localVar.selectedSampleStatus.trim().length > 0){
				$scope.selectedStatus = $scope.localVar.selectedSampleStatus;
			}else{
				$scope.selectedStatus = undefined;
			}
			
		}else{
			alert("No data for filtering");
		}
	}
	
	$scope.init = function(){
		sampleCorrectionService.getSampleMonthList().then(function(dataObj) {
			$scope.localVar.sampleMonthList = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching sample company list.');
		});
		
		sampleCorrectionService.getSampleStatusList().then(function(dataObj) {
			$scope.localVar.sampleStatusList = dataObj;      
		}, function(errorObj) {
			console.log('Error in fetching sample status list.');
		});
		$scope.onChangeOfSampleMonthOrStatus();
	}
	
	$scope.init();
	
	$scope.nextPage = function(){
		if($scope.navigation.currentPage < $scope.navigation.totalNumOfPage){
			$scope.navigation.currentPage++;
			$scope.localVar.isSampleSelected = false;
			$scope.localVar.selectedAgentIndex = undefined;
			$scope.localVar.selectedSampleObj = {};
		}
	}
	
	$scope.previousPage = function(){
		if($scope.navigation.currentPage > 1){
			$scope.navigation.currentPage--;
			$scope.localVar.isSampleSelected = false;
			$scope.localVar.selectedAgentIndex = undefined;
			$scope.localVar.selectedSampleObj = {};
		}
	}
	
	$scope.selectSample = function(sample, index){
		$scope.localVar.selectedAgentIndex = index;
		$scope.localVar.isSampleSelected = true;
		$scope.localVar.selectedSampleObj = sample;
		console.log("selected sample : "+JSON.stringify($scope.localVar.selectedSampleObj));
	}
	
	// This function is used to display selected sample from sample table in pop-up.
	$scope.showSelectedSampleDetails = function(){
		$scope.localVar.isGoToSampleBtnClicked = true;
		if($scope.localVar.isSampleSelected){
			$("#sampleDetailsModal").modal('show');
			// $rootScope.selectedAgentDataObj = $scope.selectedAgentObj;
			// $rootScope.selectedAgentDataObj.stratumIdentifier = $scope.stratumIdentifier;
			// $rootScope.isFooterFixed = true;
		}else{
			// show error
		}
	}
	// This function is used to delete selected sample from sample table.
	$scope.deleteSelectedSample = function(){
		var isConfirmed = confirm('Do you want to delete this sample ?');
		if(isConfirmed){
			sampleCorrectionService.deleteSample($scope.localVar.selectedSampleObj).then(function(dataObj) {
				$("#sampleDetailsModal").modal('hide');
			}, function(errorObj) {
				console.log('Error in deleting sample.');
			});
		}else{
			alert("isConfirmed : "+isConfirmed);
		}
		
	}
	
	// This function is used to correct/edit selected sample from sample table.
	$scope.goToActivies = function(){
		$("#sampleDetailsModal").modal('hide');
		$rootScope.navigatedFrom = 'Sample Correction';
		$timeout(function(){
			$location.path('/sampleRecordingScreen');
		},200)
	}
	
	$scope.goToDashboard = function(){
		$("#sampleDetailsModal").modal('hide');
		$timeout(function(){
			$location.path('/admin-dashboard');
		},200)
	}
	
}]);