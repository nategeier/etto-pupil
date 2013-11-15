"use strict";

<<<<<<< Updated upstream
angular.module( "engoPupil" )
.controller( "LogoutCtrl", [ "$scope", "$location", "$http", "Session", function ( $scope, $location, $http, Session ) {
=======
angular.module( "enrollgoComposerApp" )
.controller( "LogoutCtrl", [ "$scope", "$location", "$http", function ( $scope, $location, $http ) {


>>>>>>> Stashed changes
  console.log('heree:');
  var handleSuccess = function(data) {
    console.log('succeess dritst')
    $location.path('/');

  };
  Session.destroySession().success(handleSuccess);

<<<<<<< Updated upstream


=======
  
>>>>>>> Stashed changes
}]);






