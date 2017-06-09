

///<reference path="angular.min.js"/>



var app= angular
  .module('handyApp', ['ngMessages'])
  
  app.controller('FormCtrl',function($scope) 
  {
	$scope.Submit = function() 
	{
		$scope.submitted = true;
    	if ($scope.myForm.$valid) 
		    {
		         alert("Thank you for your order, an handy cleaners representative will get in touch with you shortly");// client side validation has passed, do something ....
		    } 
	    else 
		    {
				 alert("Please correct errors!");
		        // client side validation has failed
		       // $scope.myForm.submitError = true;
		    }
	};
  });
  /*app.controller('pricelistCtrl', function($scope, $http)
				{
					$http.get("json/data.json").success(function(response){
						$scope.pricelist = response;
					});
				});*/
  app.controller('aboutusCtrl',function($scope)
		  {

		  		$scope.handyAboutus = "aboutus.html";
		  });
  app.controller('menswearCtrl', function($scope){
        
        var menspricelist = [


            {"a":"Shirt/Tshirt","b":10,"c":10,"x":20,"y":20,"z":30},

             {"a":"Trousers/Denims/Jeans","b":10,"c":10,"x":20,"y":20,"z":30},

                  {"a":"Pyjama","b":10,"c":10,"x":20,"y":20,"z":30},


            {"a":"Pant","b":10,"c":10,"x":20,"y":20,"z":30},

            {"a":"Kurtha","b":10,"c":10,"x":20,"y":20,"z":30},

            {"a":"Dothi or Lungi","b":10,"c":10,"x":20,"y":20,"z":30},

              {"a":"Sweater/sweartshirt","b":20,"c":20,"x":40,"y":40,"z":50},

                          {"a":"jacket","b":20,"c":20,"x":40,"y":40,"z":50},

                       {"a":"Tie","b":5,"c":5,"x":10,"y":10,"z":15},


         //   {"a":"Towel","b":10,"c":"-","x":"-","y":"-","z":"-"},//

            {"a":"Track Pant","b":10,"c":"-","x":20,"y":"-","z":"-"},

            {"a":"Shorts","b":10,"c":10,"x":20,"y":20,"z":30}

            ];

            $scope.menspricelist = menspricelist;
       /* {
          $http.get("json/menswear.json").success(function(response){
            $scope.menspricelist = response;
          });*/
        });
  
  app.controller('womenswearCtrl',function($scope){

  		var womenspricelist = [


			{"i":"Night gown/Nightty","j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Dupatta/Scruf/Chunni","j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Leggin", "j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Blouse","j":5,"k":5,"l":10,"m":10,"n":15},

			{"i":"Peticoat","j":5,"k":5,"l":10,"m":10,"n":15},

			{"i":"Saree(chiffon/cotton)","j":20,"k":20,"l":40,"m":40,"n":50},

			{"i":"Saree(Silk)","j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Saree(Zari/creape)","j":20,"k":20,"l":40,"m":40,"n":50},

			{"i":"Trousers/Denims/Jeans","j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Kurtha","j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Pyjama","j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Skirt","j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Suit(2 pcs)","j":20,"k":20,"l":40,"m":40,"n":50},

			 {"i":"Shorts","j":10,"k":10,"l":20,"m":20,"n":30},

		      {"i":"Sweater/sweartshirt","j":20,"k":20,"l":40,"m":40,"n":50},

             {"i":"Kameej","j":10,"k":10,"l":20,"m":20,"n":30},

             {"i":"jacket","j":20,"k":20,"l":40,"m":40,"n":50},

             {"i":"Churidaar","j":10,"k":10,"l":20,"m":20,"n":30},

             {"i":"Fancy Dress","j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Shirt/TShirt/Top","j":10,"k":10,"l":20,"m":20,"n":30},

			{"i":"Salwar","j":10,"k":10,"l":20,"m":20,"n":30}

			];

			$scope.womenspricelist = womenspricelist;

  });
      /*{
          $http.get("json/household.json").success(function(response){
            $scope.housepricelist = response;
          });
        });*/
  app.controller('householdCtrl',function($scope){

  	var housepricelist = [


			{"d":"Bed sheet/Cover(Single)","e":10,"p":10,"f":20,"g":40,"h":50},

			{"d":"Bed sheet/Cover(Double)","e":10,"p":10,"f":20,"g":40,"h":50},

			{"d":"Curtain Small","e":30,"p":"N/A","f":"N/A","g":"N/A","h":"N/A"},

			{"d":"Curtain Large","e":40,"p":"N/A","f":"N/A","g":"N/A","h":"N/A"},

			{"d":"Curtain X-Large","e":50,"p":"N/A","f":"N/A","g":"N/A","h":"N/A"},

			{"d":"Face Towel","e":5,"p":"N/A","f":"N/A","g":"N/A","h":"N/A"},

			{"d":"Towel (Large)","e":10,"p":"N/A","f":"N/A","g":"N/A","h":"N/A"},

			{"d":"Pillow Covers","e":5,"p":5,"f":8,"g":"N/A","h":"N/A"},

		    {"d":"Blanket/Quilt(Single)","e":20,"p":20,"f":40,"g":40,"h":50},

 			{"d":"Blanket/Quilt(Double)","e":20,"p":20,"f":40,"g":40,"h":50},

			//{"d":"Kerchief","e":5,"p":"-","f":"-","g":"-","h":"-"},

		//	{"d":"Socks","e":10,"p":"-","f":"-","g":"-","h":"-"},

			//{"d":"Napkin","e":10,"p":"-","f":"-","g":"-","h":"-"},

			{"d":"Table Cover","e":20,"p":"N/A","f":"N/A","g":"N/A","h":"N/A"},

			{"d":"Cushian Cover","e":20,"p":"N/A","f":"N/A","g":"N/A","h":"N/A"},

			//{"d":"Refigrator Cover","e":20,"p":"-","f":"-","g":"-","h":"-"},

			//{"d":"Normal Doormat","e":10,"p":"-","f":"-","g":"-","h":"-"},

			//{"d":"Heavy Doormat","e":20,"p":"-","f":"-","g":"-","h":"-"}

			];

			$scope.housepricelist = housepricelist;
  });
     /* {
          $http.get("json/womeswear.json").success(function(response){
            $scope.womenspricelist = response;
          });
        });*/

   app.controller('dmenswearCtrl', function($scope){
        
        var dmenspricelist = [


            {"aa":"Shirt/Tshirt","bb":50},

             {"aa":"Trousers/Denims/Jeans","bb":60},

                  {"aa":"Pyjama","bb":50},


           // {"a":"Pant","b":10,"c":10,"x":20,"y":20,"z":30},

            {"aa":"Kurtha","bb":60},

            {"aa":"Dothi or Lungi","bb":40},

              {"aa":"Sweater/sweartshirt","bb":80},

                 {"aa":"jacket","bb":100},

              {"aa":"Tie","bb":30},


         //   {"a":"Towel","b":10,"c":"-","x":"-","y":"-","z":"-"},//

            {"aa":"Track Pant","bb":50},

            {"aa":"Shorts","bb":50},

            {"aa":"Sherwani","bb":250},

            {"aa":"Blazer/Coat","bb":200},

            {"aa":"Suit","bb":200},

            ];

            $scope.dmenspricelist = dmenspricelist;
       /* {
          $http.get("json/menswear.json").success(function(response){
            $scope.menspricelist = response;
          });*/
        });
  
  app.controller('dwomenswearCtrl',function($scope){

  		var dwomenspricelist = [


			{"ii":"Night gown/Nightty","jj":40},

			{"ii":"Dupatta/Scruf/Chunni","jj":50},

			{"ii":"Leggin", "jj":30},

			{"ii":"Blouse","jj":50},

			{"ii":"Peticoat","jj":40},

			{"ii":"Saree(chiffon/cotton)","jj":150},

			{"ii":"Saree(Silk)","jj":100},

			{"ii":"Saree(Zari/creape)","jj":200},

			{"ii":"Trousers/Denims/Jeans","jj":60},

			{"ii":"Kurtha","jj":50},

			{"ii":"Pyjama","jj":40},

			{"ii":"Skirt","jj":40},

			{"ii":"Suit(2 pcs)","jj":100},

			 {"ii":"Shorts","jj":50},

		      {"ii":"Sweater/sweartshirt","jj":100},

             {"ii":"Kameej","jj":40},

             {"ii":"jacket","jj":100},

             {"ii":"Churidaar","jj":50},

             {"ii":"Fancy Dress","jj":80},

			{"ii":"Shirt/TShirt/Top","jj":50},

			{"ii":"Salwar","jj":40},

			{"ii":"Bridal Lehnga","jj":1000},

			{"ii":"Half Jacket","jj":80},

			{"ii":"Shawl","jj":100},
		   
		   {"ii":"Embroided Kurthi","jj":100},

		   {"ii":"Non Bridal Lehnga","jj":300},

			{"ii":"Full Length Embroided Kurtha","jj":250}







			];

			$scope.dwomenspricelist = dwomenspricelist;

  });
      /*{
          $http.get("json/household.json").success(function(response){
            $scope.housepricelist = response;
          });
        });*/
  app.controller('dhouseholdCtrl',function($scope){

  	var dhousepricelist = [


			{"dd":"Bed sheet/Cover(Single)","ee":100},

			{"dd":"Bed sheet/Cover(Double)","ee":150},

			{"dd":"Curtain Small","ee":80},

			{"dd":"Curtain Large","ee":100},

			{"dd":"Curtain X-Large","ee":150},

			{"dd":"Face Towel","ee":30},

			{"dd":"Towel (Large)","ee":50},

			{"dd":"Pillow Covers","ee":50},

		    {"dd":"Blanket/Quilt(Single)","ee":100},

 			{"dd":"Blanket/Quilt(Double)","ee":150},

			//{"d":"Kerchief","e":5,"p":"-","f":"-","g":"-","h":"-"},

		//	{"d":"Socks","e":10,"p":"-","f":"-","g":"-","h":"-"},

			//{"d":"Napkin","e":10,"p":"-","f":"-","g":"-","h":"-"},

			{"dd":"Table Cover","ee":80},

			{"dd":"Cushian Cover","ee":50},

			{"dd":"Carpet(Sq feet)","ee":25}
			//{"d":"Refigrator Cover","e":20,"p":"-","f":"-","g":"-","h":"-"},

			//{"d":"Normal Doormat","e":10,"p":"-","f":"-","g":"-","h":"-"},

			//{"d":"Heavy Doormat","e":20,"p":"-","f":"-","g":"-","h":"-"}

			];

			$scope.dhousepricelist = dhousepricelist;
  });