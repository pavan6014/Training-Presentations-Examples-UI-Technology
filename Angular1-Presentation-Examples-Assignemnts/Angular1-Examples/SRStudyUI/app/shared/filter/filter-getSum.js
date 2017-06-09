attApp.filter('getSum', function() {
  return function(targetArray,required,sumColumns) {
    var sum=0;
	var colArray = sumColumns[required];
	for(var i=0;i<colArray.length;i++){
	if (targetArray[colArray[i]-1] !== '' && targetArray[colArray[i]-1] !== null && typeof targetArray[colArray[i]-1] !== 'undefined' && targetArray[colArray[i]-1] > 0) {
	sum+=parseInt(targetArray[colArray[i]-1]);	
	}
	}
	return sum;
  }
});

attApp.filter('getTotal', function() {
  return function(targetArray) {
   var sum = 0;
		angular.forEach(targetArray, function(target,key){
			if (target !== '' && target !== null && typeof target !== 'undefined' && target > 0) {
				sum+=parseInt(target);	
			}
			
		});
		return sum;
  }
});

attApp.filter('getColumnTotal', function() {
  return function(analystArray,index) {
   var sum = 0;
		angular.forEach(analystArray, function(analyst,key){
			if (analyst.target[index] !== '' && analyst.target[index] !== null && typeof analyst.target[index] !== 'undefined' && analyst.target[index] > 0) {
				sum+=parseInt(analyst.target[index]);	
			}
		});
		return sum;
  }
});

attApp.filter('getSumColumnAll', function() {
  return function(analystArray,required,sumColumns) {
    var sum=0;
	
	angular.forEach(analystArray, function(analyst,key){
	targetArray = analyst.target;
	for(var i=0;i<targetArray.length;i++){
	if (targetArray[i] !== '' && targetArray[i] !== null && typeof targetArray[i] !== 'undefined' && targetArray[i] > 0) {
	sum+=parseInt(targetArray[i]);	
	}
	}
	});
	return sum;
  }
});

attApp.filter('getGrandTotal', function() {
  return function(analystArray,sumColumns) {
    var sum=0;
	angular.forEach(sumColumns,function(colArray,key){
		angular.forEach(analystArray, function(analyst,key){
			targetArray = analyst.target;
			for(var i=0;i<colArray.length;i++){
					if (targetArray[colArray[i]-1] !== '' && targetArray[colArray[i]-1] !== null && typeof targetArray[	colArray[i]-1] !== 'undefined' && targetArray[colArray[i]-1] > 0) {
						sum+=parseInt(targetArray[colArray[i]-1]);	
				}
			}
		});
	});
	
	return sum;
  }
});

attApp.filter('getSumColumn', function() {
  return function(analystArray,required,sumColumns) {
    var sum=0;
	var colArray = sumColumns[required];
	angular.forEach(analystArray, function(analyst,key){
	targetArray = analyst.target;
	for(var i=0;i<colArray.length;i++){
	if (targetArray[colArray[i]-1] !== '' && targetArray[colArray[i]-1] !== null && typeof targetArray[colArray[i]-1] !== 'undefined' && targetArray[colArray[i]-1] > 0) {
	sum+=parseInt(targetArray[colArray[i]-1]);	
	}
	}
	});
	return sum;
  }
});