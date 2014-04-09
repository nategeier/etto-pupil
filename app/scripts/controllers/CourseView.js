"use strict";

angular.module("ettoPupil")
  .controller("CourseViewCtrl", ["$scope", "$compile", "course", "Record",
    function ($scope, $compile, course, Record) {
      $scope.course = course;

      $scope.$watch("user", function () {

        if ($scope.user) {
          Record.create(course._id, $scope.user._id, function (record) {
            $scope.record = record;
          });
        }
      });
    }
  ]);
