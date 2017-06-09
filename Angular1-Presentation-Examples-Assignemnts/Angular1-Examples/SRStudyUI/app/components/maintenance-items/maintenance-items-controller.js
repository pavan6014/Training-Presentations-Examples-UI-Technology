attApp.controller('maintenanceItemsController', ['$rootScope', '$scope', '$location', 'maintenanceItemsService', '$uibModal', '$window','toaster', function($rootScope, $scope, $location, maintenanceItemsService, $uibModal , $window,toaster) {
	$rootScope.isFooterFixed = false;
	$scope.errorMsg = "";
	$scope.rowSelected = 0;
	/*$http.get("").success(function(response){
		
	})
	.error(function(response){
		
	});*/
	$scope.getItems = function(){		
		maintenanceItemsService.getItems().then(function(dataObj) {			
			$scope.dbaMessagesList = dataObj;
				/* disable all the fields on load*/
			angular.forEach($scope.dbaMessagesList,function(v,k){ 
				$scope.dbaMessagesList[k].readOnly = true;
				$scope.dbaMessagesList[k].expiryDate = new Date($scope.dbaMessagesList[k].expiryDate);
			});	
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});		
	}	
	
	
	$scope.resetActiveAdmin = function(){
		
	};
	
	$scope.addNewMsg = function(){	
	
	//first check all rows are disabled
	var allRowsDisabled = true;
	
	angular.forEach($scope.dbaMessagesList,function(v,k){	
		if(!$scope.dbaMessagesList[k].readOnly) 
			allRowsDisabled = false;		
	});
	if(allRowsDisabled){
		$scope.dbaMessagesList.push({
			'message': '',
			'expiryDate': '',
			'readOnly': false,
			'selected': true
		}); 
		maintenanceItemsService.addItem($scope.dbaMessagesList[$scope.dbaMessagesList.length-1]).then(function handleSuccess(responseObj){
			$scope.newMsg = true;
			$scope.rowSelected = 1;			
		}, function handleError(){
		
		});	
		
	}
				
	};
	
	$scope.editMsg = function(){
		if($scope.rowSelected > 0){
		
		if($scope.dbaMsgForm.$invalid){
            $scope.submitted = true;
            //$window.scrollTo(0, 0);
        }else{
			angular.forEach($scope.dbaMessagesList, function(v,k){
				if($scope.dbaMessagesList[k].selected)
					$scope.dbaMessagesList[k].readOnly = false;
					$scope.dbaMessagesList[k].selected = false;
			});			
			if($scope.newMsg){
				$scope.lastItem = $scope.dbaMessagesList[$scope.dbaMessagesList.length - 1];
				$scope.lastItem = {
					'message':$scope.lastItem.message,
					'expiryDate':$scope.lastItem.expiryDate
				}
				maintenanceItemsService.updateItem($scope.dbaMessagesList[$scope.dbaMessagesList.length-1]).then(function handleSuccess(responseObj){
					$scope.dbaMessagesList[$scope.dbaMessagesList.length - 1].selected = false;
					$scope.dbaMessagesList[$scope.dbaMessagesList.length - 1].readOnly = true;
					$scope.newMsg = false;		
				}, function handleError(){
			
				});					
			}else{
				angular.forEach($scope.dbaMessagesList, function(v,k){
					$scope.dbaMessagesList[k].selected = false;
					$scope.dbaMessagesList[k].readOnly = true;					
				});
			}				
			$scope.rowSelected = 0;	
		}
		
		
			
		}else{
			$scope.errorMsg = "Select Records to be Updated"
		}	
		
	};	
	
	$scope.delNewMsg = function(){
		if($scope.rowSelected > 0){
			angular.forEach($scope.dbaMessagesList, function(v,k){
				if($scope.dbaMessagesList[k].selected){
					$scope.dbaMessagesList[k].readOnly = false;
					$scope.deleteRow = $scope.dbaMessagesList[k];
				}
			});			
			maintenanceItemsService.updateItem($scope.deleteRow).then(function handleSuccess(responseObj){
				$scope.dbaMessagesList = $scope.dbaMessagesList.filter(function(message){
				return !message.selected;	
				}, function handleError(){
				
				});	
			});
			$scope.rowSelected = 0;	
		}else{
			$scope.errorMsg = "Select Records to be Updated"
		}	
	};
	$scope.test = function(){	
		if($scope.rowSelected > 0){
			$scope.popupModalController({},$scope.delNewMsg,'confirmationDeletePopUP')
		}else{
			$scope.errorMsg = "Select Records to be Updated"
		}	
	};
		
	$scope.popupModalController =  function(popupData,popupCallback,templateUrl,templateController){	
		controller = (typeof templateController == "undefined") ? "ModalInstanceCtrl" : templateController
		var popupModalInstance = $uibModal.open({  
			animation: true,
			templateUrl: templateUrl+'.html',
			controller: controller,
			scope:$scope,
			resolve: {
				popupData: popupData
			}
		});
		popupModalInstance.result.then(function () {
				popupCallback($scope.$parent);
			}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	}	
	$scope.selectCheckbox = function(selected){
		if(selected)
			$scope.rowSelected++;
		else
			$scope.rowSelected--;
		$scope.errorMsg = "";
	}
	$scope.selMsgs = function(){
		angular.forEach($scope.dbaMessagesList, function(v,k){
			if(!$scope.dbaMessagesList[k].selected)
				$scope.dbaMessagesList[k].readOnly = true;
		});
	}
	
	$scope.releaseToAnalyst = function($event) {
		//alert($event.currentTarget.value);
		maintenanceItemsService.releaseToAnalyst($event.currentTarget.value).then(function handleSuccess(responseObj){
			toaster.clear();
			toaster.pop({
					type: 'success',
					body: 'Updated successfully',
					timeOut: 3000
			});
		}, function handleError(){
			toaster.clear();
			toaster.pop({
					type: 'Error',
					body: 'Update Failed',
					timeOut: 3000
			});
		});
	}
	
	init();
	function init(){
		$scope.getItems();
		
	}	
}]);

