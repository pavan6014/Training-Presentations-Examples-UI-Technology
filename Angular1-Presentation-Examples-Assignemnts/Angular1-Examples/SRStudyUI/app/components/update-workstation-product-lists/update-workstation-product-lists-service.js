attApp.service('updateWorkstationProductListsService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getStratumInfo: getStratumInfo,
		populatedProductGroups: populatedProductGroups
    });
	
	//service call function to get audit report
    function getStratumInfo() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getDesignStratumInfoUrl
        });
        return (request.then(handleSuccess, handleError));
    }	
	
	function populatedProductGroups() {	
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getProductGroupsUrl
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