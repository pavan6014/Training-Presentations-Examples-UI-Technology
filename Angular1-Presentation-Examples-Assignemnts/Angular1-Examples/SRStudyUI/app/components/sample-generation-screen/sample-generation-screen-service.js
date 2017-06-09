attApp.service('sampleGenerationService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){


return ({
		sampleStatusTblService: sampleStatusTblService,
        sampleGenerationService: sampleGenerationService,
		annualMonthlySamplesService: annualMonthlySamplesService,
		partialMonthlySamplesService: partialMonthlySamplesService,
		monthlySamplesService:monthlySamplesService
		//uncomment when webservice work. Fetches month elink for screen
		//monthElinkService:monthElinkService
    });
	
	//service call to get Sample Status Table
	function sampleStatusTblService(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.sampleStatusTblService
        });
        return (request.then(handleSuccess, handleError));
	}
	//uncomment when webservice work. Fetches month elink for screen
	/*function monthElinkService(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getMonthElinkUrl
        });
        return (request.then(handleSuccess, handleError));
	}*/
	
	
	//service call to get Annual Monthly Sample Sizes
	function annualMonthlySamplesService(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.annualMonthlySamplesService
        });
        return (request.then(handleSuccess, handleError));
	}
	
	//service call to get Partial Monthly Sample Sizes
	function partialMonthlySamplesService(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.partialMonthlySamplesService
        });
        return (request.then(handleSuccess, handleError));
	}
	
	//service call to get Monthly Sample Sizes Report
	function monthlySamplesService(){
		 var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.getMonthlySamples
        });
        return (request.then(handleSuccess, handleError));
	}
	
	//service call function to get audit report
    function sampleGenerationService() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.sampleGenerationService
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