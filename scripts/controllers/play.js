'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testApp
 */
angular.module('vancouverApp')
  .controller('PlayCtrl', function ($scope, globals, $http, $location){
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    

    var q_lists = [];    
	var q_index = 0;
    var q_limit = 6;

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

	    //console.log(q_lists);
	    //console.log("rnum: "+tmp_random_array);

	    getCurrentIndexQuestion();
    });


//var page_content = $("html").clone().find("script,noscript,style").remove().end().html(); 


	//$scope.question = q_lists[q_index].question;


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


    	}
    }

    $scope.submitAnswer = function(){

        //score calculation
        if($scope.isMc){
            
        }else if($scope.isCheck){

        }else if($scope.isFill){

        }


        //determine whether to display the next question or go to result page
        q_index++;
        if(q_index < q_limit)
            getCurrentIndexQuestion();
        else 
            $location.path('/result');
    }


});
