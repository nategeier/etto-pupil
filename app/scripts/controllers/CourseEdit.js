"use strict";

angular.module("ettoPupil")
  .controller("CourseEditCtrl", ["$scope", "course",
    function ($scope, course) {
      $scope.course = course;

      $scope.$on("course-save", function () {
        // TODO: Validate course before update
        $scope.course.$update();

        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox").empty();
      });
    }
  ]);
