attApp.service('resultScreenService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){

	return ({
        getProgressScaleFormat:getProgressScaleFormat
    });
	
	//service call function to get audit report
   function getProgressScaleFormat(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.progressScaleFormatURL
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

