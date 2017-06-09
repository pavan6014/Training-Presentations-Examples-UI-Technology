

var priceApp = angular.module('priceModule', []);
				priceApp.controller('pricelistCtrl', function($scope, $http)
				{
					$http.get("json/pricedata.json").success(function(response){
						$scope.pricelist = response;
						//[
						//{item:"Shirt/T-Shirt/Ladies Short/Top/Kurtha/Jeans",regular:50,premium:51,bulkpack:435}
						//];
					});
				});