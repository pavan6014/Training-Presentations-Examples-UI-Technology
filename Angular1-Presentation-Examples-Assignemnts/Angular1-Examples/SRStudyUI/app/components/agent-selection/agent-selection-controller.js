attApp.controller('agentSelectionController', ['$rootScope', '$scope', '$location', '$window', 'agentSelectionService', function($rootScope, $scope, $location, $window, agentSelectionService) {
	$scope.sampleMonth = new Date(2016,02,01);
	$scope.currentDate = new Date();
	$scope.stratumIdentifier = '';
	$rootScope.isFooterFixed = true;
	$scope.isAgentTableVisible = false;
	$scope.isAgentSelected = false;
	$scope.selectedAgentIndex = undefined;
	$scope.isStartSampleBtnClicked = false;
	$scope.selectedAgentObj = {};
	$scope.sampledCompany = '';
	$scope.sampledStratum = '';
	$scope.selectedAgentInputData = {};
	$scope.navigation = {};
	$scope.navigation.currentPage = 1;
	$scope.navigation.totalNumOfPage = 1;
	$scope.navigation.rowPerPage = 15;
	init();
	function init(){
		agentSelectionService.getSampleCompanyList().then(function(dataObj) {
			$scope.sampleCompanyList = dataObj;
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
		
		agentSelectionService.getSampleStratumList().then(function(dataObj) {
			$scope.sampleStratumList = dataObj;       
		}, function(errorObj) {
			console.log('Error in fetching sampled compant list.');
		});
		
		// back up call in case angular services does not work
		// $.ajax({
		  // url: $rootScope.URL.getCompanyUrl,
		  // method:"GET",
		  // dataType:"jsonp",
		  // success:function(data) {
			// console.log(JSON.stringify(data));
			// $scope.$apply(function () {
				// $scope.sampleCompanyList = data;
			// });
		  // }
		// });
		
		// $.ajax({
		  // url: $rootScope.URL.getStratumUrl,
		  // method:"GET",
		  // dataType:"jsonp",
		  // success:function(data) {
			// console.log(JSON.stringify(data));
			// $scope.$apply(function () {
				// $scope.sampleStratumList = data;
			// });
		  // }
		// });
	}
	
	$scope.getAgents = function(){
		$scope.selectedAgentInputData.stratum = $scope.sampledStratum;
		$scope.selectedAgentInputData.id={}
		$scope.selectedAgentInputData.id.company = $scope.sampledCompany;
		$scope.selectedAgentInputData.id.sampleMonth = $scope.sampleMonth;
		$scope.selectedAgentInputData.stratumIdentifier = $scope.stratumIdentifier;
		agentSelectionService.getAgentsList($scope.selectedAgentInputData).then(function(dataObj) {
			//$scope.agentList = dataObj; 
			$scope.agentList = dataObj.agentList; 
			if($scope.agentList.length >= 0){
				$scope.isAgentTableVisible = true;
				$rootScope.isFooterFixed = false;
				$scope.navigation.currentPage = 1;
				$scope.navigation.totalNumOfPage = Math.ceil($scope.agentList.length/$scope.navigation.rowPerPage);
				$scope.isAgentSelected = false;
				$scope.selectedAgentIndex = undefined;
				$scope.selectedAgentObj = {};
			}
		}, function(errorObj) {
			console.log('Error in fetching agent list.');
		});
	}
	
	$scope.nextPage = function(){
		if($scope.navigation.currentPage < $scope.navigation.totalNumOfPage){
			$scope.navigation.currentPage++;
			$scope.isAgentSelected = false;
			$scope.selectedAgentIndex = undefined;
			$scope.selectedAgentObj = {};
		}
	}
	
	$scope.previousPage = function(){
		if($scope.navigation.currentPage > 1){
			$scope.navigation.currentPage--;
			$scope.isAgentSelected = false;
			$scope.selectedAgentIndex = undefined;
			$scope.selectedAgentObj = {};
		}
	}
	$scope.startSample = function(){
		$scope.isStartSampleBtnClicked = true;
		if($scope.isAgentSelected && $scope.stratumIdentifier.trim().length >= 2){
			$rootScope.selectedAgentDataObj = $scope.selectedAgentObj;
			$rootScope.selectedAgentDataObj.stratumIdentifier = $scope.stratumIdentifier;
			$rootScope.$on("stratum",$scope.stratumIdentifier);
			$rootScope.isFooterFixed = true;
			$location.path("/sampleRecordingScreen");
		}else{
			// show error
		}
		
	}
	
	$scope.selectAgent = function(agent, index){
		$scope.selectedAgentIndex = index;
		$scope.isAgentSelected = true;
		$scope.selectedAgentObj = agent;
		console.log("agent : "+JSON.stringify($scope.selectedAgentObj));
	}
}]);