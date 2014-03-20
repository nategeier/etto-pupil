"use strict";

angular.module("ettoPupil")
  .controller("HomeCtrl", ["$scope", "CourseMetaChange", "Users", "Tier", "$location", "Record",
    function ($scope, CourseMetaChange, Users, Tier, $location, Record) {

      $scope.$watch("user", function () {
        if ($scope.user) {
          $scope.listUsersCreatedCourses();
        }
      });

      $scope.listUsersCreatedCourses = function () {

        Users.listUsersCreatedCourses($scope.user._tier._company, function (data) {
          $scope.createdCourses = data;
        });

        if ($scope.user._tier) {
          Users.listUsersCourses($scope.user._id, function (courses) {
            $scope.usersCourses = courses;
          });

          Tier.findTier($scope.user._tier._company, function (company) {
            $scope.compnay = company;
          });
        }
      };

      $scope.openCourse = function (course) {
        $location.path("/course/view/" + course._id);
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
