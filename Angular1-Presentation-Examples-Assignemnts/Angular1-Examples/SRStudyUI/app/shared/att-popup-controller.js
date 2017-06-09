attApp.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.animationsEnabled = true;

  $scope.popupModalController =  function(popupData,popupCallback,templateUrl,templateController){
		console.log("popup data "+JSON.stringify(popupData));
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
  };
  
 

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});


attApp.service('popupModal', function ($uibModal, $log) {


	return ({
        popupModal: popupModal,
		toggleAnimation: toggleAnimation,
	  });

  var animationsEnabled = true;

  function popupModal(popupData,popupCallback,templateUrl,templateController){
		console.log("popup data "+JSON.stringify(popupData));
		controller = (typeof templateController == "undefined") ? "ModalInstanceCtrl" : templateController
		var popupModalInstance = $uibModal.open({  
			animation: true,
			templateUrl: templateUrl+'.html',
			controller: controller,
			resolve: {
				popupData: popupData
			}
		});

		popupModalInstance.result.then(function (popupData) {
				popupCallback(popupData);
			}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
  };
  
 

  function toggleAnimation() {
    animationsEnabled = !animationsEnabled;
  };

});


// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

attApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, popupData) {

		$scope.popupData = popupData;

		$scope.ok = function () {
		   $uibModalInstance.close($scope.popupData);
		};

		$scope.cancel = function () {
		  $uibModalInstance.dismiss('cancel');
		};
  
});