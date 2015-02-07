'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testApp
 */



angular.module('vancouverApp')
  .controller('HomeCtrl', function ($scope, globals, $location, score) {

    $("#header-text").text("Home");
    $("#big-home img").click(function(){
        $location.path('/home');
        $scope.$apply();
    });


    $scope.pageClass = "page-home";
    globals.current_page = "Home";


    $scope.total_score = score.getTotalScore();


    $scope.chooseCategory = function(category){
    	//if chose random, get a random category
		if(category == 'random'){
    		var cat_arr = ["sports", "attractions", "entertainment", "history", "location"];
    		//random number from 0 to 4
			var ran_num = Math.floor((Math.random() * 4 ));    					
			category = cat_arr[ran_num];
		}

    	globals.current_category = category;

   		$location.path('/play');
    }




});



