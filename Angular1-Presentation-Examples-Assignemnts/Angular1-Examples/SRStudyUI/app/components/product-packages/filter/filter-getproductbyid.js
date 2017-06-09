//lookup directive
attApp.filter('getproductById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].prodId == +id) {
        return input[i];
      }
    }
    return null;
  }
});
