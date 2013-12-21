"use strict";

angular.module("ettoPupil")
  .controller("StorepurchaseCtrl", ["$scope", "$routeParams", "$http", "Store", "Reports",
    function ($scope, $routeParams, $http, Store, Reports) {

      Store.purchase_course($routeParams.courseID, function (data) {
        $scope.error = data.err;
        $scope.course = data.course;
        $scope.user = data.user;
        $scope.customer = data.customer;
      });

    }
  ]);
