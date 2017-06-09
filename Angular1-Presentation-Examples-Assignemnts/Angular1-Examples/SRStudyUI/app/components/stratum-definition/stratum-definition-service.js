attApp.service("stratumDefinitionService",['$http','$q','$rootScope',function($http,$q,$rootScope){
	return({
		getstratumDefinitionList:getstratumDefinitionList,
		getstratumDefinitionReportList:getstratumDefinitionReportList,
		getstratumList:getstratumList,
		getlanguageList:getlanguageList,
		getrecording_typeList:getrecording_typeList,
		getBrowseUniverseTableList:getBrowseUniverseTableList
	});
	
	function getstratumDefinitionList(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.stratumDefinitionDataUrl
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function getBrowseUniverseTableList(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.browseUniverseTableList
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function getstratumDefinitionReportList(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.stratumDefinitionReportUrl
        });
        return (request.then(handleSuccess, handleError));
	}
	
		
	function delStratumInfoList(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: "data/stratumDef.json"
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function getrecording_typeList(){
		var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getrecording_typeList
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function getlanguageList(){
	var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getlanguageList
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function getstratumList(){
		var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getstratumList
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