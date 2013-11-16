"use strict";

angular.module( "engoPupil" )
.controller( "HomeCtrl", [ "$scope", "$compile", "$http", 'Session', '$location', function ( $scope, $compile, $http, session, $location) {

  
  var handleSuccess = function(data) {
    if(data){
      $scope.session = data;
    }else{
      $location.path('/login/new/');
    } 
  };


  //session.getSessions.success(handleSuccess);
  


//console.log("user-----:", session.user)
  //console.log("is logged in-----:", session.isLogged)


  $http({ method: "GET", url: "/api/v1/sessions/home" })
    .success(function(data, status, headers, config){
      $scope.error = data.err;
      $scope.user = data.user;
      $scope.createdCourses = data.createdCourses;
    }).
    error(function(data, status, headers, config) {
      console.log(data, "err");
    });

}]);






