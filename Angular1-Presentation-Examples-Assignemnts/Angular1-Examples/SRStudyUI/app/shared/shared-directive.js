//lookup directive
attApp.directive('productActivityTimer', ['$compile', '$rootScope', '$timeout', function($compile, $rootScope, $timeout) {
    return {
        restrict: 'AE',
        replace: false,
        templateUrl: 'app/shared/templates/product-activity-timer.html',
		$scope: {
			listenedCallDetailsList: '=listenedCallDetailsList',
			selectedOccurence: '=selectedOccurence',
			allProductAndActivityList: '=allProductAndActivityList',
			bufferTime: '=bufferTime',
			stopAndResetBufferTime: '&stopAndResetBufferTime',
			isSelected:'=isSelected',
			selectedprod:'&selectedprod',
			alertDisposition:'=alertDisposition'
		},
		require: "^productActivityTimerParent",
        link: function($scope, elem, attrs, ctrl, transcludeFn) {
            console.log("selected data in side directive : "+JSON.stringify($scope.selectedOccurence));
            console.log("selected data in side directive : "+JSON.stringify($scope.listenedCallDetailsList));
			$scope.selectedOccurence.switchStatus = true;
			if(!$scope.selectedOccurence.diposition)
			$scope.selectedOccurence.diposition = "";
			if(!$scope.selectedOccurence.version)
			$scope.selectedOccurence.version = 'select';
			$scope.alertDisposition = false;
			var stopwatch = null; 
			$scope.start = function () {
				stopwatch = $timeout(function() {
					$scope.selectedOccurence.time++;
					$scope.start();
				}, 1000);
			};
			$scope.stop = function () {
				$timeout.cancel(stopwatch);
				stopwatch = null;
			};
			
			$scope.switchOnOff = function(){
				console.log("switchStatus : "+ $scope.switchStatus);
				if($scope.switchStatus){
					$scope.selectedOccurence.time = $scope.selectedOccurence.time + $scope.bufferTime;
					$scope.stopAndResetBufferTime();
					$scope.switchStatus = false; // to calculate prior time
					ctrl.switchOffAll();
					$scope.switchStatus = true;
					$scope.start();
				}else{
					$scope.startBufferTime(false);
					$scope.stop();
				}
			}
			ctrl.addAccordionItem($scope);
			ctrl.switchOffAll();
			$scope.selectedOccurence.switchStatus = true;
			$scope.start();
			
			$scope.onChangeOfActivity = function(newPA, oldPA){
				//alert('newPA : '+newPA+' ; oldPA : '+oldPA);
				/*var confirmChange = confirm("Correcting : "+oldPA);
				if(!confirmChange){
					$scope.selectedOccurence.listData = oldPA
				}else{
					// do something if changes allowed
				}*/
				$scope.correctedActivity = newPA;			
			}
			
			$scope.onChangeOfVersion = function(versionAdded){
				var duplicateProds = [];
				angular.forEach($scope.selectedOccurenceDetails.listenedCallDetailsList,function(occurVal,OccurKey){
					if(duplicateProds.length > 0 ){
						angular.forEach(duplicateProds, function(duplicateVal,duplicateKey){
							if(occurVal.listHeader == duplicateVal.listHeader && occurVal.listData == duplicateVal.listData 
								&& occurVal.version == duplicateVal.version && occurVal.version != 'select'){
									//alert("product added");
									ctrl.switchOffAll();
									$scope.$emit('sample-recording-duplicateProd',duplicateVal);
									return false;
							}else if(occurVal.version != 'select' && duplicateKey == duplicateProds.length-1){
								duplicateProds.push(occurVal);
							}
							
						
							
						});
					}
					else{
						duplicateProds.push(occurVal);
					}
				});
				
				angular.forEach($scope.selectedOccurenceDetails.listenedCallDetailsList,function(occurVal,OccurKey){
					if(duplicateProds.length > 0 ){
						angular.forEach(duplicateProds, function(duplicateVal,duplicateKey){
							if(occurVal.listHeader == duplicateVal.listHeader && occurVal.listData == duplicateVal.listData 
								&& occurVal.version == 'select'){
									$scope.selectedOccurence.highlightVersion=true;
									return false;
							}						
						});
						}
						});
				
				
				if($scope.selectedOccurence.highlightVersion == true && $scope.selectedOccurence.version!='select'){
				$scope.selectedOccurence.highlightVersion = false;
				}
			}
			
			
			$scope.refreshVersionList=function(listData){
			$scope.versionList = [];			
			for(var i=0;i<$scope.allProductAndActivityList.length;i++){
				if($scope.allProductAndActivityList[i].listName == listData){
					if($scope.allProductAndActivityList[i].version && $scope.allProductAndActivityList[i].version.length>0){
						$scope.versionList=$scope.allProductAndActivityList[i].version;
					}
				break;
				}
			}
			};
			$scope.refreshVersionList($scope.selectedOccurence.listData);
			
			//var $rowSelected = elem.find('tr');
			elem.on("click",function(){
				ctrl.resetSelectedRows();
				$scope.isSelected = !$scope.isSelected;
				$scope.selectedprod($scope.selectedOccurence.listData);
			});
			// var reset = function () {
				// stop()
				// data.value = 0;
				// data.laps = [];
			// };
			
			$scope.clearDispositionList = function(){
			if($scope.alertDisposition == true){
			$scope.selectedOccurence.diposition = "";
			$scope.alertDisposition = false;
			}
			};
			
			$scope.validateDispositionSelected = function(){
				if($scope.selectedOccurence.alertDisposition == true && $scope.selectedOccurence.diposition != ""){
					$scope.selectedOccurence.alertDisposition = false;
				}
			}
			
			$scope.$watch('dispositionlist',function(){
				var checkList=[];
				if($scope.dispositionlist){
				checkList = $scope.dispositionlist.filter(function(ele){
					return ele==$scope.selectedOccurence.diposition;
				});
				}
				if(checkList.length==0 && $scope.selectedOccurence.diposition!=''){
				$scope.alertDisposition = true;
				}
				else{
				$scope.alertDisposition = false;
				}
			
			},true);
			
			$scope.$watch('selectedOccurence.switchStatus',function(){
				console.log("watching switch status "+$scope.selectedOccurence.switchStatus);
				if($scope.selectedOccurence.switchStatus == true){
				ctrl.switchOffAll();
				$scope.selectedOccurence.switchStatus = true;
				$scope.start();
				}
			});
			
			$scope.$on("stopAllTimer",function(eve){
				ctrl.switchOffAll();
			});

			
			
        }
    };
}]);

attApp.directive("productActivityTimerParent", function () {
	return {
		replace: true,
		template: "<tbody ng-transclude></tbody>",
		restrict: "A",
		transclude: true,
		scope:{
			dispositionlist:'=dispositionlist'
		},
		controller: function ($scope, $element, $attrs, $transclude) {
			var accordionItems = [];
			var addAccordionItem = function (accordionScope) {
				// if(accordionItems.length>0){
					// angular.forEach(accordionItems, function (accordionItem) {
						// accordionItem.switchStatus = false;	
					// });
				// }
				accordionScope.selectedOccurence.switchStatus = false;
				accordionItems.push(accordionScope);
			};
			var switchOffAll = function () {
				angular.forEach(accordionItems, function (accordionScope) {
					if(accordionScope.selectedOccurence.switchStatus){
						accordionScope.selectedOccurence.prior = accordionScope.selectedOccurence.time - accordionScope.selectedOccurence.prior;
					}
					accordionScope.selectedOccurence.switchStatus = false;
					accordionScope.stop();
				});
			};

			var resetSelectedRows = function(){
				angular.forEach(accordionItems, function (accordionScope) {
					accordionScope.isSelected = false;
				});
			}

			return {
				addAccordionItem: addAccordionItem,
				switchOffAll: switchOffAll,
				resetSelectedRows:resetSelectedRows
			};
		}
	};
});

 attApp.directive('customDatepicker',function(){                            
	return {
		replace:true,
		template: "<div class=\"enhanced-datepicker\">" +
					"<div class=\"input-group\">" +
 "<input type=\"text\" class=\"form-control\" ng-required=\"ngRequired\" tooltip-trigger=\"{{tooltipTrigger}}\" tooltip-enable=\"{{tooltipEnable}}\" uib-tooltip=\"{{uibTooltip}}\" ng-model=\"ngModel\" ng-disabled=\"ngDisabled\" name=\"{{name}}\" ui-date=\"dateOptions\"/\">" +
						"<span class=\"input-group-btn\">" +
						"<button class=\"btn btn-default calendar-btn\" type=\"button\"><i class=\"glyphicon glyphicon-calendar custom-calendar-icon\"></i></button>" + 
						"</span>" + 
					"</div>" + 
				"</div>",
		scope: {
			ngModel: '=',
			dateOptions: '=',
			ngDisabled: '=',
			name: '@',
			uibTooltip:'@',
			tooltipTrigger:'@',
			tooltipEnable:'@',
			ngRequired:'='
		},
		link: function($scope, $element, $attrs, $controller){
			var $button = $element.find('button');
			var $input = $element.find('input');
			$button.on('click',function(){
				if($input.is(':focus')){
					$input.trigger('blur');
				} else {
					$input.trigger('focus');
				}
			});
		}    
	};
});


attApp.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="assets/img/loading.gif" width="100" height="100" /></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })