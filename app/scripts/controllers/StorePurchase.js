'use strict';

angular.module('engoPupil')
  .controller('StorepurchaseCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {


    $http({method: 'GET', url: '/api/v1/store/purchase_course/' + $routeParams.courseID})
      .success(function(data, status, headers, config){
        $scope.error = data.err;
        $scope.course = data.course;
        $scope.user = data.user;
        $scope.customer = data.customer;
    }).
      error(function(data, status, headers, config) {
        console.log(data, 'err');
    });


  }]);
