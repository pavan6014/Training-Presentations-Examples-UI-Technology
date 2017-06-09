var attApp = angular.module('attApp', ['ui.bootstrap', 'ngRoute', 'uiSwitch','dm.stickyNav','blockUI','angularUtils.directives.dirPagination','ui.date','toaster']);
attApp.run(function($rootScope, config) {
	// initialize rootscope here
	console.log("config constants : " + JSON.stringify(config));
	if(config.isConnectedToBackend == 1){
		$rootScope.URL = config.serviceUrl;
	}else{
		$rootScope.URL = config.localUrl;
	}
	$rootScope.selectedAgentDataObj = {};
	$rootScope.hideheader = false;
	$rootScope.hidefooter = false;
	$rootScope.rowCountPdfPage = 11;
	$rootScope.rowCountPdfPageProfileMarket = 6;
	$rootScope.rowCountPdfPageOrderType = 3;
	$rootScope.rowCountPdfPageSummary = 1;
	$rootScope.rowCountByCompany = 2;
	$rootScope.rowAnalystSampleReports = 5;
	$rootScope.adminLogin = false;
});

