attApp.service('assignedAgentsCompanyService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getAssignedAgentsCompanyReport: getAssignedAgentsCompanyReport	
    });
	
	//service call function to get audit report
    function getAssignedAgentsCompanyReport() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.assignedAgentsCompanyUrl
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