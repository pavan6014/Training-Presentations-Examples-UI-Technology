attApp.service('handlerApiService',  ['$rootScope','toaster', function($rootScope,toaster){

	return ({
		handleSuccess:handleSuccess,
		handleError: handleError,
		displayToast:displayToast
    });

	function handleSuccess(response) {
		console.log("Service Success");
		displayToast();
		//blockUI.stop();
	}
	
	function handleError(response) {
		console.log("RESPONSE "+JSON.stringify(response));
		displayToast();
		/*if(httperror){
			displayToast("Error","Unable to call the service");
		}else{
			displayToast("Failure",response.data.data.desc);
		}*/	
    }
	
	function displayToast(title,message) {
		toaster.clear();
		toaster.pop({
				type: title,
				body: message,
				timeOut: 3000
		});
	}
	
}]);