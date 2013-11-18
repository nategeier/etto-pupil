"use strict";

angular.module( "engoPupil" )
.controller( "HomeCtrl", [ "$scope", "$compile", "$http", 'Session', '$location', 'Home', function ( $scope, $compile, $http, session, $location, home) {

  

session.get_session(function(data){
  if(data){
    $scope.session = data;
  }else{
    $location.path('/login/new/');
  } 
});

home.home_layout(function(data){
  $scope.error = data.err;
  $scope.user = data.user;
  $scope.createdCourses = data.createdCourses;
});



}]);






