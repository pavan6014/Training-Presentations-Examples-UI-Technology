attApp.service('sampleCorrectionService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getSampleMonthList: getSampleMonthList,
        getSampleStatusList: getSampleStatusList,
		getSampleList: getSampleList,
		deleteSample: deleteSample
    });
	
	//service call function to get sample company list
    function getSampleMonthList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.sampleMonthList
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get sample company list
    function getSampleStatusList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.sampleStatusList
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get sample company list
    function getSampleList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.sampleList
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get 
	function deleteSample(sample) {
        var request = $http({
            method: "DELETE",
            async: true,
            cache: false,
            url: $rootScope.URL.deleteSample,
			params: {
                sample: sample
            }
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