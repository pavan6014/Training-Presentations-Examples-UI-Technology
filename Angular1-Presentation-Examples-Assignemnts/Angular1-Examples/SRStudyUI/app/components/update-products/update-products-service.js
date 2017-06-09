attApp.service('updateProductsService',
		[
				'$rootScope',
				'$http',
				'$q',
				function($rootScope, $http, $q) {
					return ({
						getProductList : getProductList,
						getTypeList : getTypeList,
						getTypeDList : getTypeDList,
						getTypeInqList : getTypeInqList,
						getDropDownDetails : getDropDownDetails,
						addNewProductList : addNewProductList,
						getCompanyList : getCompanyList,
						editProductList : editProductList

					});

					// service call function to get sample company list
					function getProductList() {
						var request = $http({
							method : "GET",
							async : true,
							cache : false,
							url : $rootScope.URL.productListUrl
						});
						return (request.then(handleSuccess, handleError));
					}

					function getTypeList() {
						var request = $http({
							method : "GET",
							async : true,
							cache : false,
							url : $rootScope.URL.validTypeList
						});
						return (request.then(handleSuccess, handleError));
					}

					function getTypeDList() {
						var request = $http({
							method : "GET",
							async : true,
							cache : false,
							url : $rootScope.URL.validTypeDList
						});
						return (request.then(handleSuccess, handleError));
					}

					function getTypeInqList() {
						var request = $http({
							method : "GET",
							async : true,
							cache : false,
							url : $rootScope.URL.validTypeInqList
						});
						return (request.then(handleSuccess, handleError));
					}

					function getDropDownDetails() {
						var request = $http({
							method : "GET",
							async : true,
							cache : false,
							url : $rootScope.URL.updateProdsdropDownDetails
						});
						return (request.then(handleSuccess, handleError));
					}

					function getCompanyList() {
						var request = $http({
							method : "GET",
							async : true,
							cache : false,
							url : $rootScope.URL.getCompanyListUrl
						});
						return (request.then(handleSuccess, handleError));
					}

					function addNewProductList(newProduct) {
						// to be removed once integrated with service
						var newProduct = newProduct;
						var request = $http({
							method : "POST",
							async : true,
							cache : false,
							data : newProduct,
							url : $rootScope.URL.saveProductsUrl
						});
						return (request.then(handleSuccess, handleError));
					}
					function editProductList(reqObj) {

						var request = $http({
							method : "POST",
							async : true,
							cache : false,
							data : reqObj,
							url : $rootScope.URL.updateProductUrl
						});
						return (request.then(handleSuccess, handleError));
					}

					// error handling function
					function handleError(response) {
						// console.log(JSON.stringify(response));
						if (!angular.isObject(response.data)
								|| !response.data.message) {
							return ($q.reject("An unknown error occurred."));
						}
						return ($q.reject(response.data.message));
					}

					function handleSuccess(response) {
						// console.log(JSON.stringify(response));
						return (response.data);
					}
				} ]);