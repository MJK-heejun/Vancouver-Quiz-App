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
  q_lists : "",
  q_lists_submitted: "",
  current_page: ""

});


//used as global object
app.factory('score', function(){
  var score = {}; //object declaration

  score.attractions = 0;
  score.entertainment = 0;
  score.location = 0;
  score.history = 0;
  score.sports = 0;

  score.getTotalScore = function(){
    return score.attractions + score.entertainment + score.location + score.history + score.sports;
  }

  score.setToZero = function(category){
    switch(category){
      case "attractions":   
        score.attractions = 0;     
      break;
      case "entertainment":
        score.entertainment = 0;
      break;
      case "location":
        score.location = 0;
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
      case "location":
        score.location += 10;
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
      case "location":
        return score.location;
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


//Filter for Capitalizing the first letter
app.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});


//used for generating swipe icon
app.filter('range', function() {
  return function(val, range) {
    range = parseInt(range);
    for (var i=0; i<range; i++)
      val.push(i);
    return val;
  };
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

