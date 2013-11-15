"use strict";

angular.module( "enrollgoComposerApp" )
.controller( "HomeCtrl", [ "$scope", "$compile", "$http", function ( $scope, $compile, $http ) {

  /*
  var handleSuccess = function(data) {
    $scope.session = data;
  };
  Session.getSessions().success(function(session){
    $scope.session = session;
    //return session;
  });
  */

  //console.log('datatatata:', Session.user)


  $http({method: 'GET', url: '/api/v1/sessions/home'})
    .success(function(data, status, headers, config){
      $scope.error = data.err;
      $scope.user = data.user;
      $scope.createdCourses = data.createdCourses;
  }).
    error(function(data, status, headers, config) {
      console.log(data, 'err');
  });

}]);






