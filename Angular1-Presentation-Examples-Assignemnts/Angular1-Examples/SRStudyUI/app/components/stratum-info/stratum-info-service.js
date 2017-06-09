attApp.service("stratumInfoService",['$http','$q',function($http,$q){
	return({
		getStratumInfoList:getStratumInfoList,
		addRecStratumInfoList:addRecStratumInfoList,
		getStratumReportService:getStratumReportService,
		updateStratumInfoList:updateStratumInfoList,
		delStratumInfoList:delStratumInfoList
	});
	
	function getStratumInfoList(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: "data/stratumInfoList.json"
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function addRecStratumInfoList(newRecord){
		 var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data:newRecord,
            url: "data/stratumInfoList.json"
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function getStratumReportService(companySel){
		 var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data:companySel,
            url: "data/stratumInfoReport.json"
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function updateStratumInfoList(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: "data/stratumInfoList.json"
        });
        return (request.then(handleSuccess, handleError));
	}
	
	function delStratumInfoList(requestObj){
		var request = $http({
            method: "POST",
            async: true,
            cache: false,
			data: requestObj,
            url: "data/stratumInfoList.json"
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