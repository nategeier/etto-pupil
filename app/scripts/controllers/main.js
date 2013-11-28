"use strict";

angular.module( "engoPupil" )
.controller( "MainCtrl", [ "$scope", "$http", "$location", function ( $scope, $http, $location ) {
  $scope.submitLogin = function(){

    $http({method: 'POST', url: '/api/v1/sessions/create_brand', data:$scope.user})
      .success(function(data, status, headers, config){
        $scope.error = data.err;
        if(data.err){
          Session.isLogged = false;
          Session.user = null;
        }else{
          Session.isLogged = true;
          Session.user = data.user;
          $location.path("/engo");
        }
    })
      .error(function(data, status, headers, config) {
        console.log(data, 'err');
        Session.isLogged = false;
        Session.user = null;
    });
  }




}]);

