attApp.controller('updateAreacodeController', ['$rootScope', '$scope', '$location', '$window', 'updateAreacodeService','JSONToCSVConvertor', function ($rootScope, $scope, $location, $window, updateAreacodeService,JSONToCSVConvertor) {

    $rootScope.hideheader = true;
    $rootScope.hidefooter = true;
    init();

    function init() {
        getAreacodeList();
        //$scope.tableHeaders = ['Stratum', 'Anayst', 'Number Of Calls'];
    }

    function getAreacodeList() {
        updateAreacodeService.getAreacode().then(function (dataObj) {
            $scope.areaCodeLists = dataObj.areaCodeLists;
            console.log(JSON.stringify($scope.areaCodeLists));
        }, handleError);
    }

    function handleError(errorObj) {
        console.log('Error in fetching Data- ' + errorObj.errorDesc);
    }
    
    $scope.add = function (dataObj) {
		updateAreacodeService.addNewAreacode(dataObj.newAreaCode).then(function handleSuccess(responseObj){
			$scope.areaCodeLists.splice(0,0,dataObj.newAreaCode);
			$scope.newAreaCode = {};
		}, function handleError(){
			
		});
	};
    
      $scope.exportAreaCode = function(){
         JSONToCSVConvertor.JSONToCSVConvertor($scope.areaCodeLists,"","Area Code List",true);
	}

}]);