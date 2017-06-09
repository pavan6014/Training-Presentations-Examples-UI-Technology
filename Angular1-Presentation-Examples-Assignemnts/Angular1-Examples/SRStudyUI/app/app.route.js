//Config the router and remove the hash tag from URL
attApp.config(['$locationProvider', '$routeProvider', '$httpProvider' , function($locationProvider, $routeProvider, $httpProvider){
	// $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	
	
    $routeProvider.
    when("/sample-statusby-company-report", {
        controller:'analystSampleController',
        templateUrl: function(params){
            if(params.report === 'sample-statusby-company-report'){
                return 'app/components/admin-reports/html/sample-statusby-company-report.html'; 
            }
        }       
    }).
    when("/agentSelection", {
        templateUrl: "app/components/agent-selection/agent-selection.html",
        controller: 'agentSelectionController'
    }).
    when("/sampleRecordingScreen", {
        templateUrl: "app/components/sample-recording-screen/sample-recording-screen.html",
        controller: 'sampleRecordingScreenController'
    }).
	when("/admin-dashboard", {
        templateUrl: "app/components/dashboard/dashboard.html",
		controller:'dashboardController'
    }).
	when("/standard-list", {
        templateUrl: "app/components/standard-list/standard-list.html",
		controller:'standardlistController'
    }).
	when("/results-screen", {
        templateUrl: "app/components/results-screen/results-screen.html",
		controller:'resultScreenController'
    }).
	when("/sample-generation-screen", {
        templateUrl: "app/components/sample-generation-screen/html/sample-generation-screen.html",
		controller:'sampleGenerationController'
    }).
	when("/sample-generation-report-screen",{
		templateUrl: "app/components/sample-generation-screen/html/monthly-samples-report.html",
		controller:'sampleGenerationReportController'
	}).
	when("/official-results", {  
        templateUrl: "app/components/official-results/html/official-results.html",
		controller:'officialResultsController'
    }).
	when("/official-results/:report",{ 
		controller:'officialResultsDetailsController',
		templateUrl: function(params){		
            if (params.report === 'profiles-by-market-2c'){			 
                return 'app/components/official-results/html/profiles-by-market-2c.html';
            }else if(params.report === 'profiles-by-market-2d'){			 
                return 'app/components/official-results/html/profiles-by-market-2d.html';
            }else if(params.report === 'ults'){			 
               return 'app/components/official-results/html/ults.html';
            }else if(params.report === 'ults-12'){			 
               return 'app/components/official-results/html/ults-12.html';
            }else if(params.report === 'summary-of-results'){			 
               return 'app/components/official-results/html/summary-of-results.html';
            }
        }
	}).
	when("/data-analysis",{
		templateUrl: "app/components/data-analysis/html/data-analysis.html",
		controller:'dataAnalysisController'
	}).
	when("/data-analysis/:report",{
		controller:'dataAnalysisReportController',
		templateUrl: function(params){		
            if (params.report === 'original-data-by-disp-report'){			
                return 'app/components/data-analysis/html/original-data-by-disp-report.html';
            } 
			else if (params.report === 'original-data-by-order-type'){			
                return 'app/components/data-analysis/html/original-data-by-order-type.html';
            } 
			else if (params.report === 'product-secs-report'){			
                return 'app/components/data-analysis/html/product-secs-report.html';
            } 
			else if (params.report === 'navigator-extracts'){			
                return 'app/components/data-analysis/html/navigator-extracts.html';
            }
        }
	}).
	when("/sample-workload",{
		templateUrl: "app/components/sample-workload-by-company/sample-workload-by-company.html",
		controller:'resultScreenController'
	}).
	when("/audit-reports",{
		templateUrl: "app/components/audit-reports/html/audit-reports.html",
		controller:'auditReportsController'
	}).
	when("/stratum-info",{
		templateUrl:"app/components/stratum-info/html/stratum-info.html",
		controller:"stratumInfoController"
	}).
	when("/audit-reports/:report",{
		controller:'auditReportsDetailsController',
		templateUrl: function(params){		
            if (params.report === 'audit-reports-details'){			
                return 'app/components/audit-reports/html/audit-reports-details.html';
            } 
			else if (params.report === 'audit-reports-details-byProducts'){			
                return 'app/components/audit-reports/html/audit-reports-details-byProducts.html';
            }
			else if (params.report === 'audit-reports-details-fallout'){			
                return 'app/components/audit-reports/html/audit-reports-details-fallout.html';
            }
        }
	}).
	when("/analyst-sample-reports",{
		templateUrl: "app/components/analyst-sample-reports/html/analyst-sample-reports.html",
		controller:'analystSampleReportsController'
	}).
	when("/analyst-sample-reports/:report",{
		controller:'analystSampleReportsDetailsController',
		templateUrl: function(params){		
            if (params.report === 'sample-status-by-company'){			
                return 'app/components/analyst-sample-reports/html/sample-status-by-company-details.html';
            } 
			else if (params.report === 'sample-status-by-office'){			
                return 'app/components/analyst-sample-reports/html/sample-status-by-office-details.html';
            } 
			else if (params.report === 'sample-status-by-analyst'){			
                return 'app/components/analyst-sample-reports/html/sample-status-by-analyst-details.html';
            } 
			else if (params.report === 'sample-status-report'){			
                return 'app/components/analyst-sample-reports/html/sample-status-report-details.html';
            }
			else if (params.report === 'samples-with-errors-or-flags'){			
                return 'app/components/analyst-sample-reports/html/samples-with-errors-or-flags-details.html';
            } 
			else if (params.report === 'samples-with-notes'){			
                return 'app/components/analyst-sample-reports/html/samples-with-notes-details.html';
            }
			else if (params.report === 'result-tracking'){			
                return 'app/components/analyst-sample-reports/html/result-tracking-details.html';
            } 
			else if (params.report === 'stratum-result-report'){			
                return 'app/components/analyst-sample-reports/html/stratum-result-report-details.html';
            }
			else if (params.report === 'analyst-metrics-report'){			
                return 'app/components/analyst-sample-reports/html/analyst-metrics-report-details.html';
            }	
			else if (params.report === 'analyst-progress-report'){			
                return 'app/components/analyst-sample-reports/html/analyst-progress-report-details.html';
            }
        }
	}).
	when("/process-logs",{
		templateUrl: "app/components/process-logs/process-logs.html",
		controller:'processlogsController'
	}).
	when("/assignment-matrix",{
		templateUrl: "app/components/assignment-matrix/assignment-matrix.html",
		controller:'assignmentmatrixController'
	}).
	when("/sample-recording",{
		templateUrl: "app/components/sample-recording-screen/sample-recording-screen.html"
	}).
	when("/maintenance-items",{
		templateUrl: "app/components/maintenance-items/maintenance-items.html",
		controller:'maintenanceItemsController'
	}).
	when("/update-products",{
		templateUrl: "app/components/update-products/update-products.html",
		controller:'updateProductsController'
	}).
	when("/product-packages",{
		templateUrl: "app/components/product-packages/product-packages.html",
		controller:'productPackagesController'
	}).
	when("/update-workstation-product-lists",{
		templateUrl: "app/components/update-workstation-product-lists/update-workstation-product-lists.html",
		controller:'updateWorkstationProductListsController'
	}).
	when("/compute-results",{
		templateUrl: "app/components/compute-results/compute-results.html",
		controller:'computeResultsController'
	}).when("/list-of-values",{
		templateUrl: "app/components/list-of-values/list-of-values.html",
		controller:'valueController'
	}).
	when("/stratum-info-report",{
		templateUrl:"app/components/stratum-info/html/stratum-info-report.html",
		controller:"stratumInfoReportController"
	}).
	when("/universe-extract",{
		templateUrl: "app/components/universe-extract/universe-extract.html",
		controller:'universeExtractController'
	}).
	when("/job-key-table",{
		templateUrl: "app/components/job-key-table/job-key-table.html",
		controller:'jobKeyTableController'
	}).
	when("/sample-correction",{
		templateUrl: "app/components/sample-correction/sample-correction.html",
		controller:'sampleCorrectionController'
	}).
	when("/update-security-access",{
		templateUrl: "app/components/update-security-access/update-security-access.html",
		controller:'updateSecurityAccessController'
	}).
	when("/analyst-reports",{
		templateUrl: "app/components/analyst-reports/analyst-reports.html",
		controller:'analystReportsController'
	}).
	when("/stratum-definition",{
		templateUrl: "app/components/stratum-definition/html/stratum-definition_landing.html",
		controller:'stratumDefinitionController'
	}).
	when("/stratum-definition-report_pdf",{
		templateUrl: "app/components/stratum-definition/html/stratum-definition.html",
		controller:'stratumDefinitionController'
	}).
	when("/stratum-definition-report",{
		templateUrl: "app/components/stratum-definition/html/stratum-definition-report.html",
		controller:'stratumDefinitionReportController'
	}).
	when("/analyst-reports/:report",{ 
		controller:'assignedAgentsCompanyController',
		templateUrl: function(params){		
            if (params.report === 'assigned-agents-month-Company(1)'){			 
                return 'app/components/analyst-reports/assigned-agents-month-Company(1)/assigned-agents-month-Company(1).html';
            }
        }
	}).
	when("/analyst-target",{
		templateUrl: "app/components/analyst-target/analyst-target.html",
		controller:'analystTargetController'
	}).
	when("/change-management",{ 
		templateUrl: "app/components/change-management/html/change-management.html",
		controller:'changeManagementController'
	}).
	when("/update-analyst",{
		controller:'updateAnalystController',
		templateUrl: "app/components/change-management/html/update-analyst.html"
	}).
	otherwise({
        redirectTo: '/admin-dashboard'
    });
}]);

attApp.constant('config', {
    appName: 'AT&T Application',
    appVersion: 1.0,
    apiUrl: 'http://www.google.com?api',
	isConnectedToBackend: 0, // 0 point to local file while 1 point to actual service
	serviceUrl: {
		getCompanyUrl: 'http://localhost:8080/srstudy/resteasyService/getAgents/company',
		/*getAgetUrl: 'http://10.76.67.55:8887/SRStudyPOC-1.0.0/getAgents/fetchAnalystSampling',*/
		getAgetUrl: 'http://localhost:8080/srstudy/resteasyService/getAgents/agents',
		getStratumUrl: 'http://localhost:8080/srstudy/resteasyService/getAgents/stratum',
		getAreaCodeUrl: 'http://localhost:8080/srstudy/resteasyService/getAreaCodes/fetchAreaCode',
		/*getProductActivityUrl: 'http://10.76.67.20:8888/SRStudyPOC-1.0.0/getAreaCodes/fetchProductActivity',*/
		getProductActivityUrl: 'data/productAndActivityListData.json',
		//universeExtractUrl:'data/universeExtract.json'
		//getDesignStratumInfoUrl: 'http://10.76.67.55:8887/SRStudyPOC-1.0.0/stratumAndCompany/getDesignStratumInfo'
		//productListUrl: "http://10.76.67.20:8888/srstudy/resteasyService/srStudyProduct/productDetails",
		//productDescAndTypeListUrl:'http://10.76.67.20:8888/srstudy/resteasyService/srStudyProduct/types',
		//productListUrl:'http://devwebsk483s.ugd.att.com:8888/srstudy/resteasyService/srStudyProduct/productDetails',
		//productTypeListUrl: 'http://devwebsk483s.ugd.att.com:8888/srstudy/resteasyService/srStudyProduct/types',
		//productDescListUrl: 'http://devwebsk483s.ugd.att.com:8888/srstudy/resteasyService/srStudyProduct/inquiries',
		//updateProductUrl: 'http://devwebsk483s.ugd.att.com:8888/srstudy/resteasyService/srStudyProduct/updateProductResults'
	},
	localUrl: {
		getCompanyUrl: 'data/sampleCompanyData.json',
		getAgetUrl: 'data/agentData.json',
		getStratumUrl: 'data/sampleStratumData.json',
		getAreaCodeUrl: 'data/areaListData.json',
		getProductActivityUrl: 'data/productAndActivityListData.json',
		getAuditReportUrl:'data/auditReportByEmp.json',
		getAuditReportUrlByProducts:'data/auditReportByProduct.json',
		getAuditReportUrlFallout:'data/auditReportFallout.json',
		getDesignStratumInfoUrl:'data/designStratumData.json',
		getOriginalDatabyDispReportDetailsUrl:'data/OriginalDatabyDispReport.json',
		getOriginalDatabyOrderTypeReportDetailsUrl:'data/originalDataByOrderType.json',
		getProductSecsReportDetailsUrl:'data/productSecsReport.json',
		getSatisfactionDataReportDetailsUrl:'data/satisfactionData.json',
		sampleGenerationService: 'data/sampleGenerationService.json',
		listOfValues: 'data/listOfValues.json',
		getProductGroupsUrl:'data/productGroups.json',
		pickProductListUrl: 'data/pickProductList.json',
		pickDescUrl:'data/pickDescriptionsList.json',
		productPackageUrl:'data/productPackages.json',
		productPackageUrl_new:'data/productPackages_new.json',
		productListUrl:'data/productList.json',
		productDescAndTypeListUrl:'data/productDescriptionsAndTypeList.json',
		annualMonthlySamplesService:'data/annualMonthlySamples.json',
		partialMonthlySamplesService:'data/annualMonthlySamples.json',
		getMonthlySamples:'data/annualMonthlySamples.json',
		sampleStatusTblService:'data/sampleStatusTbl.json',
		universeExtractUrl:'data/universeExtract.json',
		updateCompanyListUrl:'data/updateCompanyList.json',	
		jobKeyTable:'data/jobKeyTable.json',
		sampleStatusList: 'data/sampleStatusList.json',
		sampleMonthList:'data/sampleMonthList.json',
		sampleList:'data/sampleList.json',
		occuranceListUrl: 'data/occuranceList.json',
		deleteSample: 'http://10.76.67.55:8887/SRStudyPOC-1.0.0/stratumAndCompany/deleteSample',
		profileByMarket2cUrl: 'data/profileByMarket2c.json',
		ultsUrl: 'data/ults.json',
		productPackagesService_save:'data/productPackages_new.json',
		summaryOfResultsUrl: 'data/summaryOfResultsData.json',
		qrySecurityActivityLogRptUrl: 'data/securityActivityListRptData.json',
		qrySecurityAccessTrailListRptUrl: 'data/securityAccessTrailListRptData.json',
		qrySecurityAccessListRptUrl: 'data/securityAccessListRptData.json',
		qryRevokedAccessListRptUrl: 'data/revokedAccessListRptData.json',
		qryAccessNotUsedInReportListRptUrl: 'data/accessNotUsedInReportListRptData.json',
		qrySecurityAccessReviewApproveReportListRptUrl: 'data/securityAccessReviewApproveReportListRptData.json',
		sampleStatusByCompanyReport:'data/sampleStatusByCompany.json',
		sampleStatusByOfficeReport:'data/sampleStatusByOffice.json',
		sampleStatusByAnalystReport:'data/sampleStatusByAnalyst.json',
		sampleStatusReport:'data/sampleStatusReport.json',
		samplesWithErrors:'data/samplesWithErrorsOrFlags.json',
		samplesWithNotes:'data/samplesWithNotes.json',
		productListUrl:'data/productList.json',
		validTypeList:'data/validTypeList.json',
		validTypeDList:'data/validTypeDList.json',
		validTypeInqList:'data/validTypeInqList.json',
		updateProdsdropDownDetails:'data/updateProdsdropDownDetails.json',
		maintainenceItemsUrl: 'data/maintainenceItems.json',
		assignedAgentsCompanyUrl: 'data/assignedAgentsCompanyData.json',
		//getMonthElinkUrl: 'http://devwebsk483s.ugd.att.com:8888/srstudy/resteasyService/ResultsSampleGen/SampleMonthElink'
		userDetailsUrl: 'data/userDetails.json',
		dispositonListURL:'data/dispositionList.json',
		stratumDefinitionDataUrl:"data/stratumDef.json",
		stratumDefinitionReportUrl:"data/stratumDefReport.json",
		getAnalystTargetReport:"data/assignmentMatrix.json",
		browseUniverseTableList:"data/browseUniverseTable.json",		
		getNavigatorExtractsReportUrl:"data/navigatorExtracts.json",
		progressScaleFormatURL:"data/progressScaleFormat.json"		
	}
	
});
