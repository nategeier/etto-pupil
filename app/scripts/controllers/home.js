"use strict";

angular.module("ettoPupil")
  .run(function (Session) {})
  .controller("HomeCtrl", ["$scope", "$compile", "Session", "CourseList", "CourseMetaChange", "$rootScope", "Sessions",
    function ($scope, $compile, Session, CourseList, CourseMetaChange, $rootScope, Sessions) {

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
          $scope.tiersCourses = data._courses;
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