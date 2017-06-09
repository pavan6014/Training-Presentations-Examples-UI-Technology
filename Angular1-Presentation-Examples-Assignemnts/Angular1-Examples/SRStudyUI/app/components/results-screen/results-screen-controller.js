attApp.controller('resultScreenController', ['$rootScope' ,'$scope','resultScreenService','$filter',function($rootScope,$scope,resultScreenService,$filter) {
	$rootScope.isFooterFixed = false;
	init();

	function init(){
		 resultScreenService.getProgressScaleFormat().then(function(responseObj){
				$scope.progressBarData = responseObj[0];
				
				$scope.currentMonth = $filter('date')(new Date(), 'MM');
				$scope.lastResultsMonth = $filter('date')($scope.progressBarData.lastResultsMonth, 'MM');
				$scope.sampleMonth = $filter('date')($scope.progressBarData.sampleMonth, 'MM');
				
				$scope.computeResPrvMonth = $scope.lastResultsMonth == $scope.currentMonth-1;
				$scope.sampleGenCurrMonth = ($scope.sampleMonth == $scope.currentMonth) && ($scope.progressBarData.sampleGenerationOk == 1)

		}, function(errObj){
			
		});
	} 
}]);