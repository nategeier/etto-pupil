'use strict';

angular.module('engoPupil')
  .controller('LoginCtrl', ["$scope", "$http", "$location", function ( $scope, $http, $location ) {

  $scope.submitLogin = function(link){

    $http({method: 'POST', url: link, data:$scope.user})
      .success(function(data, status, headers, config){
        

        if(data.err){
          $scope.error = data.err;
          //$location.path("/engo");

        }else{

          $location.path("/engo");

        }


        //$location.path("/engo");

    })
      .error(function(data, status, headers, config) {
        console.log(data, 'err');
        //Session.isLogged = false;
        //Session.user = null;
    });
    
   }   
  
}]);
