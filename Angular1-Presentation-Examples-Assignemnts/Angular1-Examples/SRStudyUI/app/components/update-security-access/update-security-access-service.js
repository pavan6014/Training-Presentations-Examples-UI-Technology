attApp.service('updateSecurityAccessService', ['$rootScope','$http','$q', function($rootScope,$http,$q){
	return ({
        getSecurityAccessTrailListRpt: getSecurityAccessTrailListRpt,
		getSecurityActivityLogRpt: getSecurityActivityLogRpt,
		getSecurityAccessListRpt: getSecurityAccessListRpt,
		getRevokedAccessListRpt:getRevokedAccessListRpt,
		getAccessNotUsedInReportListRpt: getAccessNotUsedInReportListRpt,
		getSecurityAccessReviewApproveReportListRpt:getSecurityAccessReviewApproveReportListRpt
		
	});
	
	//service call function to get Security Access Trail list report
    function getSecurityAccessTrailListRpt() {
		var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.qrySecurityAccessTrailListRptUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get Security Activity Log list report
    function getSecurityActivityLogRpt() {
		var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.qrySecurityActivityLogRptUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get Security Access list report
    function getSecurityAccessListRpt() {
		var getSecurityAccessRequest = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.qrySecurityAccessListRptUrl
        });
        return (getSecurityAccessRequest.then(handleSuccess, handleError));
    }
	
	//service call function to get Revoked Access list report
    function getRevokedAccessListRpt() {
		var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.qryRevokedAccessListRptUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get access not used in report list report
    function getAccessNotUsedInReportListRpt() {
		var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.qryAccessNotUsedInReportListRptUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get security access review/approve list report
    function getSecurityAccessReviewApproveReportListRpt() {
		var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.qrySecurityAccessReviewApproveReportListRptUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//error handling function
    function handleError(response) {
		console.log(JSON.stringify(response));
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