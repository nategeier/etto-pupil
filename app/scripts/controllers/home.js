"use strict";

angular.module("ettoPupil")
  .controller("HomeCtrl", ["$scope", "CourseMetaChange", "Users", "Tier", "Tiers", "$location",
    function ($scope, CourseMetaChange, Users, Tier, Tiers, $location) {

      $scope.$watch("user", function () {
        if ($scope.user) {
          $scope.listUsersCreatedCourses();
        }
      });

      $scope.activetab = "home";

      TweenMax.from($("#title"), 0.6, {
        delay: 0.3,
        opacity: 0,
        y: 20
      });

      TweenMax.from($("#subtite"), 0.6, {
        delay: 0.6,
        opacity: 0,
        y: 20
      });

      TweenMax.from($(".side-panel"), 0.6, {
        opacity: 0,
        x: 150
      });

      $scope.listUsersCreatedCourses = function () {

        Tier.listCompanyCreatedCourses($scope.user._tier._company, function (data) {
          $scope.createdCourses = data;
        });

        if ($scope.user._tier) {
          Users.listUsersCourses($scope.user._id, function (courses) {
            $scope.usersCourses = courses;
          });
        }
      };

      $scope.openCourse = function (course) {
        $location.path("/course/view/" + course._id);
      };

    }
  ]);
