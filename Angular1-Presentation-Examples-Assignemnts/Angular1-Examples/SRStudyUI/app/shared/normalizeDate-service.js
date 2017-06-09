attApp.service('normalizeDate', ['$rootScope', function($rootScope){

return ({
        normalizeDate: normalizeDate,
    });
	
	function normalizeDate(tbdata,column){
	var finaltableData = tbdata; 
	angular.forEach(finaltableData,function(tbdata_value,tbdata_key){
			finaltableData[tbdata_key][column] = new Date(tbdata_value[column]);
	});
	return finaltableData;
	}
	
}]);