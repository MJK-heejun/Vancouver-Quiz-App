'use strict';

/**
 * @ngdoc overview
 * @name testApp
 * @description
 * # testApp
 *
 * Main module of the application.
 */
angular
  .module('vancouverApp', [
    'ngAnimate',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'checklist-model'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/play', {
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl'
      })
      .when('/result', {
        templateUrl: 'views/result.html',
        controller: 'ResultCtrl'
      })                  
      .otherwise({
        redirectTo: '/'
      });
  });



var app = angular.module('vancouverApp');



app.value('globals',{
  current_category: "none",
  q_lists : ""
  /*,
  total_score : 0,
  attractions_score : 0,
  entertainment_score : 0,
  geography_score : 0,
  history_score : 0,
  sports_score : 0
  */
});



app.factory('score', function(){
  var score = {}; //object declaration

  score.attractions = 0;
  score.entertainment = 0;
  score.geography = 0;
  score.history = 0;
  score.sports = 0;

  score.getTotalScore = function(){
    return score.attractions + score.entertainment + score.geography + score.history + score.sports;
  }

  score.setToZero = function(categorsy){
    switch(categorsy){
      case "attractions":   
        score.attractions = 0;     
      break;
      case "entertainment":
        score.entertainment = 0;
      break;
      case "geography":
        score.geography = 0;
      break;
      case "history":
        score.history = 0;
      break;
      case "sports":
        score.sports = 0;
      break;
      default: 
    }
  }

  score.addScore = function(category){
    switch(category){
      case "attractions":   
        score.attractions += 10;     
      break;
      case "entertainment":
        score.entertainment += 10;
      break;
      case "geography":
        score.geography += 10;
      break;
      case "history":
        score.history += 10;
      break;
      case "sports":
        score.sports += 10;
      break;
      default:         
    }
  };

  score.getFinalScore = function(category){
    switch(category){
      case "attractions":   
        return score.attractions;     
      break;
      case "entertainment":
        return score.entertainment;
      break;
      case "geography":
        return score.geography;
      break;
      case "history":
        return score.history;
      break;
      case "sports":
        return score.sports;
      break;
      default:     
        return -1;     
    }   
  }


  return score;
});







/*
app.factory('simplef', function(){
  var test = {}; //test object
  var cust = "yo customer";

  test.getCust = function(){
    return cust;
  };

  return test;
});


*/

