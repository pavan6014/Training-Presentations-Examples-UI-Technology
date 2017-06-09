attApp.controller('updateSecurityAccessController', ['$scope','updateSecurityAccessService','JSONToCSVConvertor',function($scope,updateSecurityAccessService,JSONToCSVConvertor) {
	
		$scope.getSecurityActivityLogReport = function(){
			//get Security Access Trail report data through json
			updateSecurityAccessService.getSecurityAccessTrailListRpt().then(function(dataObj) {
				$scope.qrySecurityAccessTrailReportListRpt = dataObj;
				console.log(dataObj);
			}, function(errorObj) {
				console.log('Error in fetching security access trail report list. '+errorObj.status);
			});
			
			//get Security Activity log report data through json
			updateSecurityAccessService.getSecurityActivityLogRpt().then(function(dataObj) {
				$scope.qrySecurityActivityLogRpt = dataObj;
				console.log(dataObj);
			}, function(errorObj) {
				console.log('Error in fetching security activity log report list. '+errorObj.status);
			});
			
			//get Security Access List report data through json
			updateSecurityAccessService.getSecurityAccessListRpt().then(function(securityAccessDataObj) {
				$scope.qrySecurityAccessListRpt = securityAccessDataObj;
			}, function(errorObj) {
				console.log('Error in fetching security access list report list. '+errorObj.status);
			});
			
			//get Revoked Access List report data through json
			updateSecurityAccessService.getRevokedAccessListRpt().then(function(dataObj) {
				$scope.qryRevokedAccessListRpt = dataObj;
				console.log(dataObj);
			}, function(errorObj) {
				console.log('Error in fetching revoked access list report list. '+errorObj.status);
			});
			
			//get Access Not used in report List report data through json
			updateSecurityAccessService.getAccessNotUsedInReportListRpt().then(function(dataObj) {
				$scope.qryAccessNotUsedInReportListRpt = dataObj;
				console.log(dataObj);
			}, function(errorObj) {
				console.log('Error in fetching access not used in report list report list. '+errorObj.status);
			});
			
			//get security access review/approve List report data through json
			updateSecurityAccessService.getSecurityAccessReviewApproveReportListRpt().then(function(dataObj) {
				$scope.qrySecurityAccessReviewApproveLogListRpt = dataObj;
				console.log(dataObj);
			}, function(errorObj) {
				console.log('Error in fetching security access review/approve report list. '+errorObj.status);
			});
		}
	
	$scope.init = function(){
		$scope.getSecurityActivityLogReport();
	}
	$scope.init();
	
	//add new ID
	$scope.addID = function(){
		$scope.submitted = true;
	}
	
	//export report data
	$scope.exportReportData = function(param){
		
		//export Security Access Trail List Report
		if(param === "SecurityAccessTrailReport")
		JSONToCSVConvertor.JSONToCSVConvertor($scope.qrySecurityAccessTrailReportListRpt,"","Security Access Trail List Report",true);
		
		//export Security Activity Log Report
		else if(param === "SecurityActivityLogReport")
		JSONToCSVConvertor.JSONToCSVConvertor($scope.qrySecurityActivityLogRpt,"","Security Activity Log Report",true);
		
		//export Security Access List Report
		else if(param === "SecurityAccessListReport")
		JSONToCSVConvertor.JSONToCSVConvertor($scope.qrySecurityAccessListRpt,"","Security Access List Report",true);
	
		//export Revoked Access List Report
		else if(param === "RevokedAccessLogReport")
		JSONToCSVConvertor.JSONToCSVConvertor($scope.qryRevokedAccessListRpt,"","Revoked Access List Report",true);
	
		//export Revoked Access List Report
		else if(param === "AccessNotUsedInReport")
		JSONToCSVConvertor.JSONToCSVConvertor($scope.qryAccessNotUsedInReportListRpt,"","Access Not Used In Report List Report",true);
	
		//export Security Activity Review/Approve List Report
		else if(param === "SecurityAccessReviewApproveLogReport")
		JSONToCSVConvertor.JSONToCSVConvertor($scope.qrySecurityAccessReviewApproveLogListRpt,"","Security Access Review Approve Log List Report",true);
	
	}
	
}]);