"use strict";

angular.module("ettoPupil")
  .controller("TierCtrl", ["$q", "$scope", "Tiers", "$stateParams", "CourseList", "Users",
    function ($q, $scope, Tiers, $stateParams, CourseList, Users) {

      $scope.tierID = $stateParams.id;

      $scope.reset = function () {

        $q.all([getCompanyCourses(), getTierReport(), listUsersInTier()])
          .then(function (values) {
            checkIfTierHasCourse();
          });
      };

      var getCompanyCourses = function () {
        return $q(function (resolve, reject) {
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
                  resolve(courses);
                });
            });
          });
        });
      };

      var getTierReport = function () {
        return $q(function (resolve, reject) {
          Tiers.tierReport($scope.tierID, function (results) {
            $scope.tierReport = results;
            resolve($scope.tierReport);
          });
        });
      };

      var listUsersInTier = function () {
        return $q(function (resolve, reject) {
          Users.listUsersInTier($scope.tierID, function (users) {
            $scope.users = users;
            resolve($scope.users);
          });
        });
      };

      var checkIfTierHasCourse = function () {
        _.map($scope.companyCourses, function (course) {
          _.map($scope.tierReport.courses, function (tierCourse) {
            if (course._id === tierCourse._id) {
              course.ison = true;
            }
          });
        });
      };

      $scope.updateTier = function () {
        Tiers.updateTier($scope.tier, function (results) {
          $scope.tier = results;
        });
      };

      $scope.addToAllLowerTiers = function (course) {
        addCourseToTier(course, true);
      };

      $scope.changeCourse = function (course) {

        if (course.ison === false) {
          addCourseToTier(course, false);
        } else {
          removeCourse(course._id);
        }
      };

      var addCourseToTier = function (course, addToAllLowerTiers) {
        Tiers.addCourseToTier($scope.tierID, course._id, addToAllLowerTiers, function (results) {
          $scope.tierReport = [];
          //$scope.reset();
        });
      };

      var removeCourse = function (courseId) {
        Tiers.removeCourseFromTiers($scope.tierID, courseId, function (results) {
          $scope.tierReport = [];
          //$scope.reset();
        });
      };

      $scope.reset();

    }
  ]);
