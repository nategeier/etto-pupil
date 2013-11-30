"use strict";

angular.module( "engoPupil" )
.controller( "MainCtrl", [ "$scope", "$http", "$location", function ( $scope, $http, $location ) {


  $scope.submitLogin = function(){
    console.log('clicked');

    $http({method: 'POST', url: '/api/v1/sessions/create_brand', data:$scope.user})
      .success(function(data, status, headers, config){
        console.log(data);
        
        if(data.err){
          $scope.err = data.err;
        
        }else{
          //$location.path("/engo");
           $scope.err = 'The learning worlds thanks you for your support.';
        }
    })
      .error(function(data, status, headers, config) {
        console.log(data, 'err');
        Session.isLogged = false;
        Session.user = null;
    });
  }

}]);

