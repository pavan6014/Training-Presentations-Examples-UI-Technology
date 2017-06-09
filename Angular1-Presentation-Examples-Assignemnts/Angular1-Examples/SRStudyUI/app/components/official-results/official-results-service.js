attApp.service('officialResultsService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getSampleCompanyList: getSampleCompanyList,
        getSampleStratumList: getSampleStratumList,
		getSummaryOfResultsData: getSummaryOfResultsData,
		getProfilesByMarket: getProfilesByMarket,
		getUltsData: getUltsData,
		setResultDetails: setResultDetails,
		getResultDetails: getResultDetails
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
	
	//service call function to get sample company list
    function getSampleStratumList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getStratumUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getSummaryOfResultsData() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.summaryOfResultsUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getProfilesByMarket() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.profileByMarket2cUrl
        });
        return (request.then(handleSuccess, handleError));
    }	
	
	function getUltsData() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.ultsUrl
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