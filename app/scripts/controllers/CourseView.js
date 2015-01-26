"use strict";

angular.module("ettoPupil")
  .controller("CourseViewCtrl", ["$scope", "$compile", "course", "Record",
    function ($scope, $compile, course, Record) {
      $scope.course = course;

      $scope.checkIfFreeCourse = function () {
        if ($scope.course.price === 0 && $scope.course.status === "live") {
          return true;
        }
        return false;
      };

      $scope.lockedBlock = false;

      $scope.$watch("user", function () {

        if ($scope.user) {

          Record.create(course._id, $scope.user._id, function (record) {
            if (record.err) {
              $scope.err = record.err;
            }
            $scope.record = record;
          });
        }
      });
    }
  ]);
