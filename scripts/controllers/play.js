'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testApp
 */
angular.module('vancouverApp')
  .controller('PlayCtrl', function ($scope, globals, $http, $location, score){
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.formData = {}; //answers received from user
    var q_lists = [];//array of questions    
	var q_index = 0; //start from 0
    var q_limit = 6; //6 questions per try

    //retrieve the questions list from JSON file
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


        //score calculation
        if($scope.isMc){
            if(q_lists[q_index].answer == $scope.formData.mc_val){
                score.addScore(globals.current_category);            
                console.log("correct. +10 score.");
            }
        }else if($scope.isCheck){
            //not complete
            console.log($scope.formData.check_val);
        }else if($scope.isFill){
            var my_answer = $scope.formData.fill_val;
            if(q_lists[q_index].answer == my_answer.toLowerCase()){
                score.addScore(globals.current_category);            
                console.log("correct. +10 score.");
            }
        }

        //determine whether to display the next question or go to result page
        q_index++;
        if(q_index < q_limit)
            getCurrentIndexQuestion();
        else 
            $location.path('/result');
    }


    //private functions thingy
    function getCurrentIndexQuestion(){

        $scope.question = q_lists[q_index].question;

        $scope.q_type = q_lists[q_index].type;

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
