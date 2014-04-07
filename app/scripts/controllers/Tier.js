"use strict";

angular.module("ettoPupil")
  .controller("TierCtrl", ["$scope", "Tiers", "$routeParams", "CourseList", "Users",
    function ($scope, Tiers, $routeParams, CourseList, Users) {

      $scope.tierID = $routeParams.id;

      $scope.reset = function () {
        Tiers.findTier($scope.tierID, function (results) {
          $scope.tier = results;

          //---Company courses
          CourseList.listCompanyCourses(results._company, function (courses) {

            async.map(courses, function (course, callback) {
                course.ison = false;
                callback();
              },
              function () {
                $scope.companyCourses = courses;
              });
          });
        });

        Tiers.tierReport($scope.tierID, function (results) {
          $scope.tierReport = results;
        });

        Users.listUsersInTier($scope.tierID, function (users) {
          $scope.users = users;
        });
      };

      $scope.updateTier = function () {
        Tiers.updateTier($scope.tier, function (results) {
          $scope.tier = results;
        });
      };

      $scope.addCourse = function (course) {
        Tiers.addCourseToTier($scope.tierID, course._id, course.ison, function (results) {
          $scope.tierReport = [];
          $scope.reset();
        });
      };

      $scope.removeCourse = function (courseId) {
        Tiers.removeCourseFromTiers($scope.tierID, courseId, function (results) {
          $scope.tierReport = [];
          $scope.reset();
        });
      };

      $scope.reset();
    }
  ]);
