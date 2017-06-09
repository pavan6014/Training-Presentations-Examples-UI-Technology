attApp.service('productPackagesService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){

	return ({
        productPackagesService: productPackagesService,
		productPackagesService_new: productPackagesService_new,
		productPackagesService_save : productPackagesService_save 
    });
	
	//service call function to get audit report
    function productPackagesService() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.productPackageUrl
        });
        return (request.then(handleSuccess, handleError));
    }	
	
	function productPackagesService_new() {
        var request = $http({
            method: "GET",
            async: true,
            cache: false,
            url: $rootScope.URL.productPackageUrl_new
        });
        return (request.then(handleSuccess, handleError));
    }	
	
	function productPackagesService_save(requestObj){
		var request = $http({
            method: "GET",
            async: true,
            cache: false,
			data:requestObj,
            url: $rootScope.URL.productPackagesService_save
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