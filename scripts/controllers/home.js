'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testApp
 */



angular.module('vancouverApp')
  .controller('HomeCtrl', function ($scope, score) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.total_score = score.total;

    //score.total += 1;

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

