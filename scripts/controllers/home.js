'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testApp
 */



angular.module('vancouverApp')
  .controller('HomeCtrl', function ($scope, globals, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.total_score = globals.total_score;

    //score.total += 1;


    $scope.chooseCategory = function(category){
      globals.current_category = category;
      $location.path('/play');
    }



});



/*
angular.module('vancouverApp')
  .controller('HomeCtrl', ['score', function ($scope, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //console.log(score.total);


  }]);
*/

