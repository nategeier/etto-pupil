"use strict";

angular.module("ettoPupil")
  .controller("HomeCtrl", ["$scope", "$compile", "Session", "CourseList", "CourseMetaChange", "$rootScope",
    function ($scope, $compile, Session, CourseList, CourseMetaChange) {

      $scope.$watch("user", function () {
        if ($scope.user) {
          $scope.listUsersCreatedCourses();
        }
      });

      $scope.listUsersCreatedCourses = function () {

        CourseList.listUsersCreatedCourses($scope.user, function (data) {
          $scope.courses = data;
        });

        var obj = {
          _id: $scope.user._tier._id
        };

        CourseList.listTiersCourses(obj, function (data) {
          $scope.tiersCourses = data;
        });
      };

      $scope.removeCourse = function (id) {

        var course = {
          id: id
        };

        CourseMetaChange.removeCourse(course, function (data) {
          $scope.listUsersCreatedCourses();
        });
      };
    }
  ]);
