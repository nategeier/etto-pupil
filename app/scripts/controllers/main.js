"use strict";

angular.module( "engoPupil" )
.controller( "MainCtrl", [ "$scope", "$http", "$location", function ( $scope, $http, $location ) {
  $scope.submitLogin = function(link){

    $http({method: 'POST', url: link, data:$scope.user})
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

        //$location.path("/engo");

    })
      .error(function(data, status, headers, config) {
        console.log(data, 'err');
        Session.isLogged = false;
        Session.user = null;
    });
  }
}]);

