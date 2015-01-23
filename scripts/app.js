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
    'ngTouch'
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




app.factory('score', function(){
  var score = {}; //object declaration

  score.total = 0;
  score.attractions = 0;
  score.entertainment = 0;
  score.geography = 0;
  score.history = 0;
  score.sports = 0;

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

