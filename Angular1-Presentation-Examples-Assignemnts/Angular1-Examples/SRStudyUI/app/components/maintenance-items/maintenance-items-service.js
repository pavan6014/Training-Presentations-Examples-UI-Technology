attApp.service('maintenanceItemsService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){

return ({
		getItems:getItems,
		addItem:addItem,
		updateItem: updateItem,
		deleteItem:deleteItem,
		releaseToAnalyst:releaseToAnalyst
    });
	
	function getItems(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.maintainenceItemsUrl
			
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function addItem(newRecord){
		// to be removed once integrated with service
		var newRecord = newRecord;
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
			data:newRecord,
            url: $rootScope.URL.maintainenceItemsUrl
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function updateItem(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: $rootScope.URL.maintainenceItemsUrl
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function deleteItem(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: $rootScope.URL.maintainenceItemsUrl
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function releaseToAnalyst(requestParam){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
            url: $rootScope.URL.maintainenceItemsUrl + '?lookupTableName=' +  requestParam
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