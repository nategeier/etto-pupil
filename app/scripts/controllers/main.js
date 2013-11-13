"use strict";

angular.module("enrollgoComposerApp")
.controller("MainCtrl", [ "$scope", "$http", function ( $scope, $http ) {
  $scope.hellos = 'weeeee';

  $http({method: 'GET', url: '/api/v1/store/course_store'}).
  success(function(data, status, headers, config) {
    console.log(data, headers, config)
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    console.log(data, headers, config)
    // or server returns response with an error status.
  });
}]);

