attApp.controller('attParentController', ['$rootScope', '$scope', '$location', '$window', function($rootScope, $scope, $location, $window) {
	$rootScope.isFooterFixed = true;
	$rootScope.user = {};
	$rootScope.user.lastName = "Kumar";
	$rootScope.user.firstName = "Manjesh";
	$rootScope.user.analystId = "15";
	$rootScope.user.connection = "Development";
	
	$('.dropdown-toggle').dropdown();
	
	/* Sorting for table implementation */
	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}
	
	$scope.print = function(){
		window.print();
	}
	
}]);