attApp.service('analystSampleReportsService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getSampleCompanyList: getSampleCompanyList,
		getSampleStatusByCompany : getSampleStatusByCompany,
		getSampleStatusByOffice : getSampleStatusByOffice,
		getSampleStatusByAnalyst : getSampleStatusByAnalyst,
		getSampleStatusReport : getSampleStatusReport,
		getSamplesWithErrorsOrFlags : getSamplesWithErrorsOrFlags,
		getSamplesWithNotes : getSamplesWithNotes,
		getResultTracking : getResultTracking,
		getStratumResultReport : getStratumResultReport,
		getAnalystMetricsReport : getAnalystMetricsReport,
		getAnalystProgressReport : getAnalystProgressReport,
		setResultDetails : setResultDetails,
		getResultDetails : getResultDetails
    });
	
	//service call function to get sample company list
    function getSampleCompanyList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getCompanyUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getSampleStatusByCompany() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: "data/sampleStatusByCompany.json"
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getSampleStatusByOffice() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.sampleStatusByOfficeReport
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getSampleStatusByAnalyst() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.sampleStatusByAnalystReport
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getSampleStatusReport() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.sampleStatusReport
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getSamplesWithErrorsOrFlags() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.samplesWithErrors
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getSamplesWithNotes() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.samplesWithNotes
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getResultTracking() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.pickProductListUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getStratumResultReport() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.pickProductListUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getAnalystMetricsReport() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.pickProductListUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getAnalystProgressReport() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.pickProductListUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function setResultDetails(param) {		
      resultDetails = param;
	  sessionStorage.resultDetailsParam = param;	 
	}

	function getResultDetails(){
		return sessionStorage.resultDetailsParam;
	}
	
	function handleSuccess(response){
		return response.data;
	}
	
	function handleError(response){
		return response;
	}
	
}]);