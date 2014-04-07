"use strict";

angular.module("ettoPupil")
  .controller("HomeCtrl", ["$scope", "CourseMetaChange", "Users", "Tier", "Tiers", "$location",
    function ($scope, CourseMetaChange, Users, Tier, Tiers, $location) {

      var leaderHead = "Start creating, taking, and sharing courses";
      var learderSubHead = "Welome team";
      var leaderUrl = "/images/leaderboard/default-lg.jpg";

      $scope.$watch("user", function () {
        if ($scope.user) {
          $scope.listUsersCreatedCourses();
        }
      });

      $scope.updateLeaderboard = function () {

        var tier = {
          _id: $scope.user._tier._company,
          leaderboard: $scope.company.leaderboard
        };
        Tiers.updateLeaderboard(tier, function (results) {
          ///Saved
        });
      };

      $scope.updateMainImg = function () {
        $scope.showAssetLibrary(function (asset) {
          $scope.company.leaderboard.imgUrl = asset.url;
          $scope.updateLeaderboard();
        });
      };

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

        Users.listUsersCreatedCourses($scope.user._tier._company, function (data) {
          $scope.createdCourses = data;
        });

        if ($scope.user._tier) {
          Users.listUsersCourses($scope.user._id, function (courses) {
            $scope.usersCourses = courses;
          });

          Tier.findTier($scope.user._tier._company, function (company) {
            $scope.company = company;

            //Sets default if they dont have a custome leaderboard
            if (!$scope.company.leaderboard) {
              $scope.company.leaderboard = {
                title: leaderHead,
                subtitle: learderSubHead,
                imgUrl: leaderUrl
              };
            } else {
              if (!$scope.company.leaderboard.title) {
                $scope.company.leaderboard.title = leaderHead;
              }
              if (!$scope.company.leaderboard.subtitle) {
                $scope.company.leaderboard.subtitle = learderSubHead;
              }
              if (!$scope.company.leaderboard.imgUrl) {
                $scope.company.leaderboard.imgUrl = leaderUrl;
              }
            }

          });
        }
      };

      $scope.openCourse = function (course) {
        $location.path("/course/view/" + course._id);
      };

    }
  ]);
