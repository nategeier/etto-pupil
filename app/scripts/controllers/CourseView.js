"use strict";

angular.module("ettoPupil")
  .controller("CourseViewCtrl", ["$scope", "$compile", "course",
    function ($scope, $compile, course) {
      $scope.course = course;
    }

  ]);
