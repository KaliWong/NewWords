var myApp = angular.module('myApp',[])

myApp.service('HistoryService',function($http){
	var baseUrl = "http://localhost:8080/"

	this.saveWord = function (newWord) { //set up the saveWord function
		var url = baseUrl + "saveCurrent" // add the address of the saveCurrent to the baseUrl
	    return $http.post(url, {"word": newWord}) // output newWord to the server
	}

})

myApp.controller('MyController', function($scope, HistoryService) { // now the controller can use the HistoryService as well 
  	$scope.newWord = 'cat'

  	$scope.saveThisWord = function (){ 
  		HistoryService.saveWord($scope.newWord) // use the saveWord function in History Service
  		.then(saveSuccess, error) //svaeSucess function or error function
  	}

  	function saveSuccess (json) {
    	console.log(json) // print out at client side console i.e. on browser -> ctl+shift+i
  	}

  	function error (err) {
    	console.log(err)
  	}
})
