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
          $scope.courses = data;
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

        async.waterfall([

            function (callback) {
              Record.createRecord(course._id, $scope.user._id, $scope._tier._company._id, function (results) {
                $location.path("/course/view/" + course._id);
              });
            }
          ],
          function (err, results) {
            $location.path("/course/view/" + course._id);
          })

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
