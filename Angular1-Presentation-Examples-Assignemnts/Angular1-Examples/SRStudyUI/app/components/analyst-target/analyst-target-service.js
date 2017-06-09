
attApp.service('analystTargetService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getAnalystTargetReport: getAnalystTargetReport,
    });
	
	//service call function to get sample company list
    function getAnalystTargetReport() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getAnalystTargetReport
        });
        return (request.then(handleSuccess, handleError));
    }
	
	
	function handleSuccess(response){
		return response.data;
	}
	
	function handleError(response){
		return response;
	}
	
}]);


