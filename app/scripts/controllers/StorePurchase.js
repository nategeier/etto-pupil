'use strict';

angular.module('engoPupil')
  .controller('StorepurchaseCtrl', ['$scope', '$routeParams', '$http', 'Store', function ($scope, $routeParams, $http, Store) {

    Store.purchase_course($routeParams.courseID, function(data){
      $scope.error = data.err;
      $scope.course = data.course;
      $scope.user = data.user;
      $scope.customer = data.customer;
    });
  }]);
