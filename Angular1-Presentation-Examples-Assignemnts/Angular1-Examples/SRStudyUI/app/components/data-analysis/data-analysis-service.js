attApp.service('dataAnalysisService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
	return ({
        getSampleCompanyList: getSampleCompanyList,
        getSamplePickProductList: getSamplePickProductList,
		getSamplePickDescList: getSamplePickDescList,
		getOriginalDatabyDispReportDetails:getOriginalDatabyDispReportDetails,
		getOriginalDatabyOrderTypeReportDetails:getOriginalDatabyOrderTypeReportDetails,
		getProductSecsReportDetails:getProductSecsReportDetails,
		getSatisfactionDataReportDetails:getSatisfactionDataReportDetails,
		getNavigatorExtractDetails:getNavigatorExtractDetails
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
	
	//service call function to get sample Product list
	function getSamplePickProductList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.pickProductListUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function to get sample Product Description list
	function getSamplePickDescList() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.pickDescUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function for getOriginalDatabyDispReportDetails
	function getOriginalDatabyDispReportDetails() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getOriginalDatabyDispReportDetailsUrl
        });
        return (request.then(handleSuccess, handleError));
    }	
	
   //service call function for getOriginalDatabyOrderTypeReportDetails
	function getOriginalDatabyOrderTypeReportDetails() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getOriginalDatabyOrderTypeReportDetailsUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	 //service call function for getProductSecsReportDetails
	function getProductSecsReportDetails() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getProductSecsReportDetailsUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	//service call function for getSatisfactionData
	function getSatisfactionDataReportDetails() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getSatisfactionDataReportDetailsUrl
        });
        return (request.then(handleSuccess, handleError));
    }
	
	function getNavigatorExtractDetails() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getNavigatorExtractsReportUrl
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