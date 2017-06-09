attApp.filter('productfilter', function() {
  return function(prodList,key) {
	  var output = [];
	  var keys = [];
      angular.forEach(prodList, function(prodItem) {
		  var pattern = /(CS|Ofr|Fill)/g;
		  var listName = prodItem.listName;
		  prodItem.listName = prodItem.listName.replace(pattern,"").trim();
		  prodItem.desc = prodItem.desc.replace(pattern,"");
		   var pattern1 = 'CS';
		  var pattern2 = 'Ofr';
		  var pattern3 = 'Fill';
		  
		  var version='';
		  
		  if(listName.indexOf(pattern1)>-1)
		  version = 'CS';
		  else if(listName.indexOf(pattern2)>-1)
		  version = 'Ofr';
		  else if(listName.indexOf(pattern3)>-1)
		  version = 'Fill';
		  
		  var uniqueKey = prodItem[key];
		  if(keys.indexOf(uniqueKey) === -1) {
              keys.push(uniqueKey);
			  prodItem.version = [];
			  if(version!='')
			  prodItem.version.push(version);
              output.push(prodItem);
          }else{
		  if(output[keys.indexOf(uniqueKey)].version)
		  output[keys.indexOf(uniqueKey)].version.push(version);
		  }
		  
      });
      return output;
   };
});
