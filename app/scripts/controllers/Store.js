'use strict';

angular.module("engoPupil")
.controller("StoreCtrl", [ "$scope", "$http", "$location", 'Store', function ( $scope, $http, $location, store ) {


  store.course_store(function(data){
    $scope.error = data.err;
    $scope.courses = data.courses;
    $scope.user = data.user;

  });

 


}]);
