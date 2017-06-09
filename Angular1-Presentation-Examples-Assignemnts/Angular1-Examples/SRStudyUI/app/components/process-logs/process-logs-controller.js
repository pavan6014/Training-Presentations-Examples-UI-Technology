attApp.controller('processlogsController', ['$rootScope', '$scope', '$location', '$http','processLogsService',function($rootScope, $scope, $location,$http, processLogsService) {
	$rootScope.isFooterFixed = false;
	$scope.searchCriteria = ['Batch Process Id', 'Batch Process Name', 'Submitted by User', 'Status'];
	
	$scope.filterProcessLogs = function(){
		processLogsService.getProcessLogDetails($scope.processReqObj).then(handleSuccess,handleError);
	}
	
	init();
	
	
	function init(){
		processLogsService.getProcessLogDetails().then(handleSuccess,handleError);
	}
	
	function handleSuccess(responseObj){
		$scope.requesttable = responseObj.requesttable;
		$scope.processlogtable = responseObj.processlogtable;
		$scope.errorlog = responseObj.errorlog;
	}
	
	function handleError(errorObj){
		console.log("Error in calling service - ProcessLogs")
	}
}]);

