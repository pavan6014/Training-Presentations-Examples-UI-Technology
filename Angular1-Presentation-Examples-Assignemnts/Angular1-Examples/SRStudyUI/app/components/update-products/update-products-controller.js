attApp.controller('updateProductsController', ['$rootScope', '$scope', 'updateProductsService','JSONToCSVConvertor','filterFilter','toaster',function($rootScope, $scope, updateProductsService,JSONToCSVConvertor,filterFilter,toaster) {

	$rootScope.isFooterFixed = false;
	$scope.radioFilter = 'N';
	$scope.selectedFilter = false;
	$scope.isProductInActive = false;
	$scope.editCheckbox = 'false';
	$scope.Error = false;
	$scope.selectedProduct = {};
	$scope.newProductList = {};
	$scope.init = function(){

		updateProductsService.getProductDescriptionsAndTypeList().then(function(dataObj) {
			console.log(dataObj)
			$scope.typeOfProductList = dataObj.regulatoryType;
			$scope.productDescList = dataObj.regulatoryDesc;
			//uncomment with webservice
			/*
			$scope.typeOfProductList = dataObj;
			//$scope.productDescList = dataObj.regulatoryDesc;	*/
			//console.log($scope.typeOfProductList + " "+$scope.productDescList)
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});
		 // updateProductsService.getProductDescriptions().then(function(dataObj) {
			// $scope.productDescList = dataObj;
			// console.log("desc list"+JSON.stringify(dataObj));
			// //$scope.productDescList = dataObj.regulatoryDesc;
			// //console.log($scope.typeOfProductList + " "+$scope.productDescList);
		// }, function(errorObj) {
			// console.log('Error in fetching area list. '+errorObj.status);
		// });
		

		$scope.getProductList();
		$scope.getTypeList();
		$scope.getTypeDList();
		$scope.getTypeInqList();
		$scope.getDropDownDetails();
	}
	
	$scope.getTypeList = function(){
		updateProductsService.getTypeList().then(function(dataObj){
			$scope.validTypeList = dataObj;
		});
	}
	
	$scope.getTypeDList = function(){
		updateProductsService.getTypeDList().then(function(dataObj){
			$scope.validTypeDList = dataObj;
		});
	}
	
	$scope.getTypeInqList = function(){
		updateProductsService.getTypeInqList().then(function(dataObj){
			$scope.validTypeInqList = dataObj;
		});
	}
	
	$scope.getDropDownDetails = function(){
		updateProductsService.getDropDownDetails().then(function(dataObj){
			$scope.dropDownDetails = dataObj;
		});
	}
	
	$scope.getProductList = function(){
		updateProductsService.getProductList().then(function(dataObj) {
			console.log(dataObj)
			$scope.productsList = dataObj;
			
			//replace incative 0 and 1 with false and true respectively			
			angular.forEach($scope.productsList,function(productObj,key){
				if(productObj.inactive == "0")
					productObj.inactive = false;
				else
					productObj.inactive = true;
			});
		
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});
	}
	
	$scope.addNewProduct = function(dataObj){
		$scope.newProductList.active = "1";
		$scope.newProductList.billing = "1";
		updateProductsService.addNewProductList(dataObj.newProductList).then(function(dataObj) {
			// if success then hide pop-up and display added row to table
			if(true){
				$scope.newProductList.active = true;
				$scope.productsList.splice(0,0,$scope.newProductList); 
				$scope.newProductList = {};				
			}
		}, function(errorObj) {
			console.log('Error in adding new table list. '+errorObj.status);
		});
	}
	
	
	$scope.getUpdateCompanyList = function(){
		updateProductsService.getCompanyList().then(function(dataObj) {
			console.log(dataObj)
			$scope.companyList = dataObj;
			//console.log(JSON.stringify($scope.productsList))
		}, function(errorObj) {
			console.log('Error in fetching area list. '+errorObj.status);
		});
	}
	
	$scope.init();
	
	$scope.applyfilter = function(filter){
		$scope.selectedFilter = filter;
		$scope.selectedProduct = {};
		$scope.isProductInActive = false;
		angular.forEach($scope.productsList,function(productObj,key){
				productObj.editEnable = false;
				$scope.editCheckbox = false;
		});
	}
	
	$scope.editUpdateProduct = function(){
			 angular.forEach($scope.productsList,function(prodObj){
					if(prodObj.editEnable){
						reqObj = prodObj;
						delete reqObj.editEnable;
						reqObj.inactive = (reqObj.inactive == true )? "1" : "0";
						reqObj.billing = (reqObj.billing == true )? "1" : "0";
					}
						
		     });
			 
			updateProductsService.editProductList(reqObj).then(function(responseObj){
				angular.forEach($scope.productsList,function(prodObj,key){
					prodObj.editEnable = false;
				});
				toaster.clear();
				toaster.pop({
						type: 'success',
						body: 'Product Records Updated successfully',
						timeOut: 3000
				});
		    },function(errorObj){
		    	toaster.clear();
				toaster.pop({
						type: 'success',
						body: 'Error calling service',
						timeOut: 3000
				});
		    });  
	}
	
	
	
	$scope.showUpdateCompanyModal = function(){
		if ($scope.editCheckbox !=true)
		{
			$scope.isProductInActive=true;
			$scope.editCheckbox = false;
		}	
		else{
			$scope.getUpdateCompanyList(); 
			$("#updateCompanyModal").modal('show');
		}
	}
	
	$scope.selectProduct = function(product){
		$scope.selectedProduct = product;
		if(product.editEnable && product.inactive){
			console.log("selected product : "+$scope.selectedProduct+product.inactive);
			$scope.isProductInActive = product.inactive;
			
			
		}else{
			$scope.isProductInActive = false;
		}
		
	}
	
	$scope.updateSelection = function(productNumber) {
	 
	  angular.forEach($scope.productsList, function(productObj, index) {
	    if (productObj.productNumber != productNumber) 
		{productObj.editEnable = false;
			
		}  
		  else
		  {  productObj.editEnable = true;
		  $scope.editCheckbox = true;
		  $scope.selectedRowProductNumber = productObj.productNumber;
		  }
		  });
    }
	
	$scope.exportProductData = function(){
		JSONToCSVConvertor.JSONToCSVConvertor($scope.productsList,"","Products List ",true);
	}
	
	
	
	//with webservice update uncomment with webservice
	/*$scope.editUpdateProduct = function(){
		// validate each field before calling services 
		
		updateProductsService.editProductList($scope.selectedRowProductNumber).then(function(dataObj) {				
				
				console.log("Save successful");
			
		}, function(errorObj) {
			console.log('Error in update table list. '+errorObj.status);
		});
	}*/
	
	$scope.tbHeaders = {
		'productNumber':'Product Number',
		'productName':'Product Name'
		
	}
	
}]);
