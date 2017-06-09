attApp.service('auditReportsDetailsService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getAuditReportDetails: getAuditReportDetails,
		getAuditReportDetailsByProducts: getAuditReportDetailsByProducts,
		getAuditReportDetailsFallout: getAuditReportDetailsFallout 
    });
	
	//service call function to get audit report by employee
    function getAuditReportDetails() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getAuditReportUrl
        });
        return (request.then(handleSuccess, handleError));
    }	
	
	//service call function to get audit report by products
	function getAuditReportDetailsByProducts() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getAuditReportUrlByProducts
        });
        return (request.then(handleSuccess, handleError));
    }	
	
	//service call function to get audit report by products
	function getAuditReportDetailsFallout() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getAuditReportUrlFallout
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