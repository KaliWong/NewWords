var myApp = angular.module('myApp',[])

myApp.service('GifService', function($http) {

  	var baseUrl = "https://api.giphy.com/v1/gifs/"
  	var apiKey = "dc6zaTOxFJmzC"

  	// We’ll add some functions to get gifs here
  	this.getGifs = function (query) {
  	var url = baseUrl + "search?q=" + query + "&api_key=" + apiKey
  		return $http.get(url) // get gifs from the server
	}
})

myApp.service('HistoryService',function($http){
	var baseUrl = "http://localhost:8080/"

	this.saveWord = function (newWord) { //set up the saveWord function
		var url = baseUrl + "saveCurrent" // add the address of the saveCurrent to the baseUrl
	    return $http.post(url, {"word": newWord}) // send newWord to the server
	}

	this.getSaved = function () {
    var url = baseUrl + "getSaved"
    return $http.get(url)
  	}

})

myApp.controller('MyController', function($scope, HistoryService, GifService) { // now the controller can use the HistoryService and GitService as well 
  	$scope.newWord = 'cat'
  	$scope.words = []
  	$scope.gifUrl = ''

  	$scope.saveThisWord = function (){ 
  		HistoryService.saveWord($scope.newWord) // use the saveWord function in History Service
  		.then(saveSuccess, error) //svaeSucess function or error function
  	}

  	$scope.getSavedWords = function (){ 
  		HistoryService.getSaved()
    	.then(loadSuccess, error)

  	}

  	$scope.showGifs = function($event) {
    	GifService.getGifs( $event.currentTarget.innerHTML ) //use getGifscurrentTarget = things been clicked
    	.then(gifSuccess, error)
  	}


  	function saveSuccess (json) {
    	console.log(json) // print out at client side console i.e. on browser -> ctl+shift+i
  	}

  	function loadSuccess (json) {
    	$scope.words = json.data // set scope.word with the data from the server
 	}

 	function gifSuccess (json) {
	  	if (json.data.data[0]) { // check if there is a gif or not
	    	$scope.gifUrl = json.data.data[0].images.fixed_height.url  // display the corresponding gif    
	  	} else {
	    	$scope.gifUrl = "http://goo.gl/tioFyj" // display a don't know face gif
	  	}
	}


  	function error (err) {
    	console.log(err)
  	}
})
