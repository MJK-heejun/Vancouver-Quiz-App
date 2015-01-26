'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testApp
 */
angular.module('vancouverApp')
  .controller('PlayCtrl', function ($scope, globals, $http, $location, score, $interval, $rootScope){

    $scope.formData = {}; //answers received from user
    var q_lists = [];//array of questions    
    var q_index = 0; //start from 0
    var q_limit = 6; //6 questions per try
    var timerInterval; //setInterval for timer

    //if the current_category is 'none', it means that the user refreshed the page or manually typed the url path
    if(globals.current_category == "none"){
      //navigatge back to home
      $location.path('/home');
    }

    //retrieve the questions list from JSON file
    //$http.get('scripts/questionsJson/'+globals.current_category+'.json').then(function(res){
		$http.get('scripts/questionsJson/'+globals.current_category+'.json').then(function(res){    	
    	var tmp_random_array = [];
	    while(tmp_random_array.length < q_limit){
	    	var tmp_r_val = Math.floor((Math.random() * res.data.length));

	    	if( $.inArray(tmp_r_val, tmp_random_array) == -1 ){
	    		tmp_random_array.push(tmp_r_val);
	    	}
	    }


	    for(var i=0; i<tmp_random_array.length; i++){
	    	var r_num = tmp_random_array[i];
	    	q_lists[i] = res.data[r_num];	    
	    }

      //reset the category score
      //setScoreToZero(globals.current_category);
      score.setToZero(globals.current_category);
      //start the question!!
	    getCurrentIndexQuestion();
    });


    $scope.submitAnswer = function(){

        timerStop();

        //score calculation
        if($scope.isMc){
            if(q_lists[q_index].answer == $scope.formData.mc_val){
                score.addScore(globals.current_category);            
                console.log("correct. +10 score."); //debug line
            }              
        }else if($scope.isCheck){
            if(typeof($scope.formData.check_val) != "undefined" && q_lists[q_index].answer == $scope.formData.check_val.sort()){
              score.addScore(globals.current_category);
              console.log("correct. +10 score."); //debug line
            }
        }else if($scope.isFill){
            var my_answer = $scope.formData.fill_val;
            if(typeof(my_answer) != "undefined" && q_lists[q_index].answer == my_answer.toLowerCase()){
                score.addScore(globals.current_category);            
                console.log("correct. +10 score."); //debug line
            }
        }

        //reset the val for next question
        $scope.formData.mc_val = -1;
        $scope.formData.check_val = [];
        $scope.formData.fill_val = "";

        //determine whether to display the next question or go to result page
        q_index++;
        if(q_index < q_limit)
            getCurrentIndexQuestion();
        else 
            $location.path('/result');
    };


    //private functions thingy
    function getCurrentIndexQuestion(){

        timerStart();

        //retrieve content from list
        $scope.question = q_lists[q_index].question;
        $scope.q_type = q_lists[q_index].type;

        //reset boolean scope element for view
        $scope.isMc = false;
        $scope.isCheck = false;
        $scope.isFill = false;        

        if(q_lists[q_index].type == "mc")
            $scope.isMc = true;
        else if(q_lists[q_index].type == "check")
            $scope.isCheck = true;
        else if(q_lists[q_index].type == "fill")
            $scope.isFill = true;

        if($scope.isMc || $scope.isCheck){    
            //retrive option content for the question
            var tmp_arr = [];
            var i=0;
            while(typeof( q_lists[q_index].option[i] ) != "undefined"){
                 tmp_arr[i] = q_lists[q_index].option[i];    
                 i++;
            }
            $scope.option = tmp_arr;            


        }else if($scope.isFill){
            //do nothing
        }
    }


    function timerStart(){

      $scope.time_limit = 5; //seconds

      timerInterval = $interval(function(){      
          $scope.time_limit -= 1;

          //console.log($scope.time_limit);

          if($scope.time_limit < 1)
            $scope.submitAnswer();
      }, 1000);
    }

    function timerStop(){
      $interval.cancel(timerInterval);
    }

    //stop the timer when navigating away manually
    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
      timerStop();
      }
    );   


    $scope.get_q_index = function(){
      return q_index;
    };
    $scope.get_q_limit = function(){
      return q_limit;
    };



/*
    function setScoreToZero(category){
        switch(category){
          case "attractions":   
            globals.attractions_score = 0;     
          break;
          case "entertainment":
            globals.entertainment_score = 0;
          break;
          case "geography":
            globals.geography_score = 0;
          break;
          case "history":
            globals.history_score = 0;
          break;
          case "sports":
            globals.sports_score = 0;
          break;
          default:          
        }        
    }

    function addScore(category){
        switch(category){
          case "attractions":   
            globals.attractions_score += 10;     
          break;
          case "entertainment":
            globals.entertainment_score += 10;
          break;
          case "geography":
            globals.geography_score += 10;
          break;
          case "history":
            globals.history_score += 10;
          break;
          case "sports":
            globals.sports_score += 10;
          break;
          default:          
        }        
    }
*/
});
