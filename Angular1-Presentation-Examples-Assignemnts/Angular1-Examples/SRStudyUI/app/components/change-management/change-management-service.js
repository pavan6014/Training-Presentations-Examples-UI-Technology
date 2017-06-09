attApp.service('changeManagementService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){

return ({
		getAnalystData:getAnalystData
    });
	
	function getAnalystData(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.maintainenceItemsUrl
			
        });
        return (request.then(handleSuccess, handleError));
	} 
	

	
	
	
	function handleSuccess(response){
		return response.data;
	}
	
	function handleError(response){
		console.log("error handling stratum info service");
	}
	
}]);