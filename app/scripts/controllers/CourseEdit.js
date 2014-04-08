"use strict";

angular.module("ettoPupil")
  .controller("CourseEditCtrl", ["$scope", "course", "$upload",
    function ($scope, course, $upload) {
      $scope.course = course;

      $scope.isEditing = true;

      $scope.statuses = ["live", "testing", "private"];

      $scope.$on("course-save", function () {
        // TODO: Validate course before update
        $scope.course.$update();

        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox-blocktools").empty();
      });

      $scope.updateThumb = function () {
        $scope.showAssetLibrary(function (asset) {
          $scope.course.thumb = asset.url;
          $scope.saveCourse();
        });
      };

      $scope.updateBlock = function (block, name) {
        console.log(name)
        $scope.showAssetLibrary(function (asset) {
          block.data[name] = asset.url;
          $scope.saveCourse();
        });
      };
    }
  ]);
