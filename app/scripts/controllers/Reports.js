"use strict";

angular.module("ettoPupil")
  .controller("ReportsCtrl", ["$scope", "Tier", "Tiers", "$stateParams", "$location", "Users", "Record",
    function ($scope, Tier, Tiers, $stateParams, $location, Users, Record) {

      $scope.parentID = $stateParams.parentID;

      $scope.activetab = "people";

      if ($scope.parentID === "0") {
        $scope.parentID = null;
      }

      $scope.showCourseReportToggle = function () {
        $scope.showCourseReport = !$scope.showCourseReport;
      };

      $scope.listUsers = function () {
        Users.listUsersInTier($scope.parentID, function (users) {
          $scope.users = users;

          if ($scope.users && $scope.users[0]) {
            async.map($scope.users, function (user) {
              Record.userOverallProgress(user._id, user._tier, function (result) {
                user.overallPercent = Number(result.overallPercent);
              });
            });
          }
        });
      };

      $scope.reset = function () {

        $scope.children = [];

        Tiers.findTier($scope.parentID, function (results) {
          $scope.currentTier = results;
          if (results._children && results._children[0]) {

            async.map(results._children, function (tierId) {
              Tiers.tierReport(tierId, function (results) {
                $scope.children.push(results);
              });
            });
          } else {
            $scope.showCourseReport = true;
          }

        });

        Tiers.tierReport($scope.parentID, function (results) {
          $scope.tierReport = results;
        });
      };

      $scope.add = function (newTier) {
        newTier = {
          title: newTier.title,
          parent: $scope.parentID,
        };
        Tiers.addTier(newTier, function (results) {
          $scope.reset();
          $scope.listUsers();
          $scope.newTier.title = "";
        });
      };

      $scope.remove = function (tierID) {
        var tier = {
          _id: tierID,
          parent: $scope.parentID
        };
        Tiers.removeTier(tier, function (results) {
          $scope.reset();
        });
      };

      $scope.reset();
      $scope.listUsers();
    }
  ]);
