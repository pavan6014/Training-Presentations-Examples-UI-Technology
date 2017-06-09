attApp.service('universeExtractService', ['$rootScope', '$http', '$q','toaster', function($rootScope, $http, $q,toaster){

return ({
		getUniverseExtract:getUniverseExtract,
		addUniverseExtract:addUniverseExtract,
		updateUniverseExtract: updateUniverseExtract,
		deleteUniverseExtract:deleteUniverseExtract
    });
	
	function getUniverseExtract(){
		 var request = $http({
            method: "POST",
            async: true,
            cache: false,
            url: "data/universeExtract.json"
			//url: $rootScope.URL.universeExtractUrl
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function addUniverseExtract(newRecord){
		// to be removed once integrated with service
		var newRecord = newRecord;
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
			data:newRecord,
            url: "data/universeExtract.json"
        });
        return (request.then(handleSuccess, handleError));
	}
	
	//service call for exit procedures
	function callExitprocs(){
	}
	
	function updateUniverseExtract(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: "data/universeExtract.json"
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function deleteUniverseExtract(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: "data/universeExtract.json"
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