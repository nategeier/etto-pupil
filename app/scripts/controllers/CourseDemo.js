"use strict";

angular.module("ettoPupil")
  .controller("CourseDemoCtrl", ["$scope", "$compile", "course", "$location", "$timeout",
    function ($scope, $compile, course, $location, $timeout) {
      $scope.course = course;

      //--- Changed view if they are still on that initial page every 2 min
      var startLocation = $location.path();

      $scope.onTimeout = function () {
        if (startLocation === $location.path()) {
          $location.path("/store/" + $scope.user._tier._id);
        }
        $timeout.cancel(demoTimeout);
      };

      var demoTimeout = $timeout($scope.onTimeout, 120000);
    }
  ]);
