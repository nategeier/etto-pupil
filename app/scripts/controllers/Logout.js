"use strict";

angular.module( "enrollgoComposerApp" )
.controller( "LogoutCtrl", [ "$scope", "$location", "$http", "Session", function ( $scope, $location, $http, Session ) {
  console.log('heree:');
  var handleSuccess = function(data) {
    console.log('succeess dritst')
    $location.path('/');

  };
  Session.destroySession().success(handleSuccess);


  
}]);






