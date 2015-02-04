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

    $("#header-text").text(globals.current_category.charAt(0).toUpperCase() + globals.current_category.slice(1));
    $("#big-home img").click(function(){
        $location.path('/home');
        $scope.$apply();
    });

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


    //used for the progress bar
    $scope.get_q_index = function(){
      return q_index;
    };
    $scope.get_q_limit = function(){
      return q_limit;
    };


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
        }else{ //wrong answer
          console.log("Wrong. The correct answer is:"+ q_lists[q_index].answer);
        }

        //reset the val for next question
        $scope.formData.mc_val = -1;
        $scope.formData.check_val = [];
        $scope.formData.fill_val = "";

        //determine whether to display the next question or go to result page
        q_index++;
        if(q_index < q_limit){
          getCurrentIndexQuestion();
        }else{
          $location.path('/result');
          globals.q_lists = q_lists;
        }
    };


    //private functions thingy
    function getCurrentIndexQuestion(){

        timerStart();

        //fill progress bar
        fillProgressBar(q_index);

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

    function fillProgressBar(index){
      index++;
      $("#p"+index).css("background-color","#78c192");
    }


    function timerStart(){

      $scope.time_limit = 59; //seconds

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

    $()


    //stop the timer when navigating away manually
    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
      timerStop();
      }
    );   

    
    $scope.buttonClick = function(q_type){
      //console.log(this);
/*
      var tmp_val = this.value;
      console.log($('input[value='+tmp_val+']'));
      $('input[value='+tmp_val+']').attr('ng-checked', true);
      */
      //console.log($scope.formData.mc_val);
console.log("aaa");

      if(q_type == "mc"){
        $scope.formData.mc_val = this.value;  
      }else if(q_type == "check"){
        //if the value not in the array, push into the array
        if($.inArray(this.value, $scope.formData.check_val) == -1 ){
          $scope.formData.check_val.push(this.value);
        //or if it's already in the array, pull it out
        }else{
          var tmp_i = $scope.formData.check_val.indexOf(this.value);
          if(tmp_i != -1)
            $scope.formData.check_val.splice(tmp_i,1);                    
        }

      }else if(q_type == "fill"){
        //do nothing

      }else{
        console.log("something wrong");
      }

          


    };

});
