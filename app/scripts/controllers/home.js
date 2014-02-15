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
        console.log("vrerated", $scope.user._id)
        CourseList.listUsersCreatedCourses($scope.user._id, function (data) {
          $scope.courses = data;
        });
        if ($scope.user._tier) {
          CourseList.listTiersCourses($scope.user._tier._id, function (courses) {
            $scope.tiersCourses = courses;
          });
        }

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
