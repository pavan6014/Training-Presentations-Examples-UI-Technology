attApp.service('analystReportsService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getSampleCompanyList: getSampleCompanyList,
        getSampleStratumList: getSampleStratumList
    });
	
	//service call function to get sample company list
    function getSampleCompanyList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getCompanyUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get sample company list
    function getSampleStratumList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getStratumUrl
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