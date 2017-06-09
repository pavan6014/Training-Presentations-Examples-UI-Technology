attApp.service('listOfValuesService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){

   return ({
        getListOfValues: getListOfValues,
		addListOfValues:addListOfValues,
		updateListOfValues:updateListOfValues,
		deleteListOfValues:deleteListOfValues
    });
	
	function getListOfValues(){
		 var request = $http({
            method: "POST",
            async: true,
            cache: false,
            url: $rootScope.URL.listOfValues
        });
        return (request.then(handleSuccess, handleError));
	}

	function addListOfValues(newRecord){
		var newRecord = newRecord;
		 var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data:newRecord,
            url: $rootScope.URL.listOfValues
        });
        return (request.then(handleSuccess, handleError))
	}
	
	function updateListOfValues(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: $rootScope.URL.listOfValues
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function deleteListOfValues(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: $rootScope.URL.listOfValues
        });
        return (request.then(handleSuccess, handleError));
	}
	
	//service call for exit procedures
	function callExitprocs(){
	}

	function handleSuccess(response){
		return response.data;
	}
	
	function handleError(response){
		console.log("error handling stratum info service");
	}
	
}]);