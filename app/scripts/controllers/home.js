"use strict";

angular.module("engoPupil")
  .controller("HomeCtrl", ["$scope", "$compile", "$http", "Home",
    function ($scope, $compile, $http, Home) {

      Home.home_layout(function (data) {
        $scope.error = data.err;
        $scope.user = data.user;
        $scope.createdCourses = data.createdCourses;
      });

      $scope.active = "Home";

    }
  ]);
