"use strict";

angular.module("ettoPupil")
  .controller("CourseEditCtrl", ["$scope", "course", "$upload",
    function ($scope, course, $upload) {
      $scope.course = course;

      $scope.isEditing = true;

      $scope.statuses = ["live", "testing", "private"];

      /*$scope.on("blur", function () {
        console.log("nrfuyrfuyref ery gfiyerfh herif er")
      });*/

      $scope.$on("course-save", function () {
        // TODO: Validate course before update
        $scope.course.$update();

        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox-blocktools").empty();
      });
    }
  ]);
