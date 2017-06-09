attApp.service('sampleRecordingService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getProductAndActivityList: getProductAndActivityList,
		getAreaCodeList: getAreaCodeList,
		getOccuranceList: getOccuranceList,
		getDispositionList:getDispositionList
    });
	
	//service call function to get activity/product list on the basis of era code
    function getProductAndActivityList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getProductActivityUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get all area code list
    function getAreaCodeList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getAreaCodeUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get all area code list
    function getOccuranceList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.occuranceListUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getDispositionList($scope){
		  var requestObj = $scope.selectedOccurenceDetails.orderType;
		  var request = $http({
            method: "GET",
            async: true,
            cache: false,
			data: requestObj,
            url: $rootScope.URL.dispositonListURL
        });
        return (request.then(handleSuccess, handleError));
	}
	
	//error handling function
    function handleError(response) {
		//console.log(JSON.stringify(response));
        if (!angular.isObject(response.data) || !response.data.message) {
            return ($q.reject("An unknown error occurred."));
        }
        return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
		//console.log(JSON.stringify(response));
        return (response.data);
    }
}]);