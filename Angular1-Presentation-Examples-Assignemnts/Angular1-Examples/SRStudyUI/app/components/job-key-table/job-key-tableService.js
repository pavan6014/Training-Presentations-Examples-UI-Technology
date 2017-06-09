attApp.service('jobKeyTableService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){

	return ({
        getJobKeyTable: getJobKeyTable,
		addJobKeyTable:addJobKeyTable,
		updateJobKeyTable:updateJobKeyTable,
		deleteJobKeyTable:deleteJobKeyTable
    });
	
	function getJobKeyTable() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: "data/jobKeyTable.json"
        });
        return (request.then(handleSuccess, handleError));
    }	
	
	function addJobKeyTable(newRecord){
		var newRecord = newRecord;
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
			data:newRecord,
            url: "data/jobKeyTable.json"
        });
		return (request.then(handleSuccess, handleError));
	}
	
	function updateJobKeyTable(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: "data/jobKeyTable.json"
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function deleteJobKeyTable(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: "data/jobKeyTable.json"
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