attApp.controller('productPackagesController', ['$rootScope', '$scope', '$location', 'productPackagesService','JSONToCSVConvertor','$filter','toaster','popupModal',function($rootScope, $scope, $location, productPackagesService,JSONToCSVConvertor,$filter,toaster,popupModal) {
	
	$rootScope.isFooterFixed = false;
	$rootScope.hidden = false; 
	$scope.packageType = "Filter Based on Select Value";
	$scope.packages_new = {};	
	$scope.SelectedPkg = {};
	$scope.listAssociatedPkg = [];
	$scope.associateProductSelected = [];
	$scope.duplicateError = false;
	$scope.showAddPackage = false;
	$scope.showPageDuplicateError = false;
	$scope.showAssocProdTable = false;
	$scope.isNewChangeSaved = true;
	$scope.emptyObj = {
						"prodName":"Select",
						"prodId":"0"
					};
	
	$scope.addPackage = function(){
		$scope.showAddPackage = true; 
	};
	
	$scope.listAssociatedPkgToAdd = [{prodName: "Assoc Prod 1", prodId: "1"},{prodName: "Assoc Prod 2", prodId: "2"},{prodName: "Assoc Prod 3", prodId: "3"},{prodName: "Assoc Prod 4", prodId: "4"}];
	
	$scope.productPackagesService = function(){
		productPackagesService.productPackagesService().then(function(dataObj) {
			$scope.packages = dataObj.packages;
			//$scope.associateProducts = dataObj.associateProducts;
			$scope.getListAssociateArray();
			$scope.SelectedPkg = $scope.packages[0];
			$scope.loadAssocProd(); 
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});		
	}
	
	$scope.productPackagesService_new = function(){
		productPackagesService.productPackagesService_new().then(function(dataObj) {
			$scope.packages_new = dataObj.packages;

		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});		
	}

    $scope.getListAssociateArray = function(){
	
	angular.forEach($scope.packages,function(pkgValue,pkgKey){
	    angular.forEach(pkgValue.assocProducts, function(assocProObj,index){
		if(!$filter('getproductById')($scope.listAssociatedPkg,assocProObj.prodId))
		$scope.listAssociatedPkg.push(assocProObj);
	});
	
	});
	
	};	
	
	$scope.loadAssocProd = function(){
			if($scope.SelectedPkg){
			$scope.assocProds = $scope.SelectedPkg.assocProducts;
			$scope.showAssocProdTable = true;
			}
			else
			$scope.showAssocProdTable = false;
			
			$scope.verifyShowActiveAdd();
		}
	
	$scope.exportPackage = function(){
        var finalJSON = [], dataObj = $scope.packages;
        for (var i=0;i<dataObj.length;i++) {
              finalJSON.push({
                     'Package Name' : dataObj[i]['pkgName'],
                     'Package ID' : dataObj[i]['pkgId'],
                     'Product Name' : dataObj[i]['assocProducts'][0]['prodName'],
                     'Product ID' : dataObj[i]['assocProducts'][0]['prodId']
              });

              for (var j=1; j<dataObj[i]['assocProducts'].length;j++) {
                    finalJSON.push({
                             'pkgName' : '',
                             'pkgId' : '',
                             'prodName' : dataObj[i]['assocProducts'][j]['prodName'],
                             'prodId' : dataObj[i]['assocProducts'][j]['prodId']
                    });
              }
        }

		JSONToCSVConvertor.JSONToCSVConvertor(finalJSON,"","Product Packages",true);
	}
	
	$scope.countPackages = 290;
	
	$scope.addProdAsPkg = function(){
	$scope.showAddPackage = false;
	
			var newPackage = $scope.newPackage;
		
		var pkg = $scope.packages.filter(function(pkgItem){
            return (pkgItem.pkgName == $scope.newPackage);
        });
		
		if(pkg.length>0){
		$scope.showPageDuplicateError = true;
		}
		else{
		$scope.packages.push(newPackage);
		$scope.SelectedPkg = newPackage;
		$scope.loadAssocProd();
		$scope.countPackages++;
		$scope.showPageDuplicateError = false;
		}
	}
	
	$scope.deletePackage = function(){
	  
	}

	$rootScope.$on('deleteProduct',function(event,popupData){$scope.deletePackageConfirm(popupData)});
	
	$scope.deletePackageConfirm = function(popupData){
	   	var pkgItem = popupData.pkgItem;
		var indexOfSelected = -1;
		$scope.packages = $scope.packages.filter(function(pkgItem){
            if(pkgItem.pkgName == $scope.SelectedPkg.pkgName)
			indexOfSelected++;
			return true;
        });
		$scope.packages[indexOfSelected].assocProducts = [{}];
		$scope.SelectedPkg.assocProducts = [{}];		
		//$scope.SelectedPkg = {};
		$scope.loadAssocProd();
	}
	
	$scope.addNewAssociatedProduct = function(){
	if($scope.SelectedPkg.assocProducts)
	$scope.SelectedPkg.assocProducts.push({});
	else{
	$scope.SelectedPkg.assocProducts = [{}];
	$scope.loadAssocProd();
	}	
	$scope.isNewChangeSaved = false;
	
	};
	
	$scope.UpdateAssocProd = function(index){
	if($scope.associateProductSelected[index] == null){
	$scope.associateProductSelected[index] = $scope.emptyObj;
	}
	if($scope.SelectedPkg && $scope.associateProductSelected[index] && $filter('getproductById')($scope.SelectedPkg.assocProducts,$scope.associateProductSelected[index].prodId)){
	$scope.SelectedPkg.assocProducts[index]=[{}];
	$scope.associateProductSelected[index] = [{}];
	$scope.duplicateError = true;
	}
	else{
	$scope.duplicateError = false;
	}
	$scope.SelectedPkg.assocProducts[index] = $scope.associateProductSelected[index];
	$scope.verifyShowActiveAdd ();
		
	
	};
	
	$scope.verifyShowActiveAdd = function(){
	
		var showActiveButton = false;
		angular.forEach($scope.SelectedPkg.assocProducts,function(pkgValue,pkgKey){
		if(!pkgValue || !pkgValue.prodId){
		showActiveButton = true;
		}		
		});
		
		if(showActiveButton){
		$scope.isNewChangeSaved = false;
		}
		else{
		$scope.isNewChangeSaved = true;
		}
	
	
	}
	
	$scope.saveNewAssociatedProduct = function(){
		$rootScope.$on("saveAssocProd", function(data){
		productPackagesService.productPackagesService_save(data).then(
		function(dataObj){
			toaster.clear();
			toaster.pop({
					type: 'success',
					body: 'Associated Products Saved successfully',
					timeOut: 3000
			});
		
		},function(errorObj){
			
		});
		
			$scope.isNewChangeSaved = true;
		});
		var showalert = false;
		angular.forEach($scope.SelectedPkg.assocProducts,function(pkgValue,pkgKey){
		if(!pkgValue.prodId){
		showalert = true;
		}		
		});
		
		if(showalert)
		popupModal.popupModal({},$scope.passData,'saveEmptyConfirm','saveEmptyConfirm');
		else
		$rootScope.$broadcast('saveAssocProd',$scope.assocProds);
		
		
	}
	
	$scope.passData = function(){};
		
	init();
	function init(){
		$scope.productPackagesService();
		$scope.productPackagesService_new();
	}	

}]);

attApp.controller('deleteProductConfirm', ['$scope', '$uibModalInstance', 'popupData','$rootScope',function($scope, $uibModalInstance, popupData,$rootScope) {

$scope.popupData = popupData;

		$scope.ok = function () {
		   $uibModalInstance.close($scope.popupData);
		   $rootScope.$broadcast('deleteProduct',$scope.popupData);
		};

		$scope.cancel = function () {
		  $uibModalInstance.dismiss('cancel');
		};

}]);

attApp.controller('saveEmptyConfirm', ['$scope', '$uibModalInstance', 'popupData','$rootScope',function($scope, $uibModalInstance, popupData,$rootScope) {

$scope.popupData = popupData;

		$scope.ok = function () {
		   $uibModalInstance.close($scope.popupData);
		   $rootScope.$broadcast('saveAssocProd',$scope.popupData);
		};
		
		$scope.help = function () {
		   $uibModalInstance.close($scope.popupData);
		    $rootScope.$broadcast('callHelp',$scope.popupData);
		};
		
		$scope.cancel = function () {
		  $uibModalInstance.dismiss('cancel');		 
		};

}]);
