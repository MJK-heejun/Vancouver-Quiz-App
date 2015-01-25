'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testApp
 */
angular.module('vancouverApp')
  .controller('ResultCtrl', function ($scope, globals, score) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //retrive the result
    $scope.total_current_category_score = score.getFinalScore(globals.current_category);
/*
    function getFinalScore(){
        switch(globals.current_category){
          case "attractions":   
            return globals.attractions_score;     
          break;
          case "entertainment":
            return globals.entertainment_score;
          break;
          case "geography":
            return globals.geography_score;
          break;
          case "history":
            return globals.history_score;
          break;
          case "sports":
            return globals.sports_score;
          break;
          default:     
          	console.log("current category: "+globals.current_category);
          	return -1;     
        }        
    }    
*/

  });
