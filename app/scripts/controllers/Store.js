'use strict';

'use strict';


angular.module("enrollgoComposerApp")
.controller("StoreCtrl", [ "$scope", "$http", "$location", function ( $scope, $http, $location ) {



  $http({method: 'GET', url: '/api/v1/store/course_store'})
    .success(function(data, status, headers, config){
      $scope.error = data.err;
      $scope.courses = data.courses;
      $scope.user = data.user;

  }).
    error(function(data, status, headers, config) {
      console.log(data, 'err');
  });


}]);
