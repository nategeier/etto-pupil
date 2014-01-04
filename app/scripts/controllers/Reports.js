"use strict";

angular.module("ettoPupil")
  .controller("ReportsCtrl", ["$scope", "Tiers", "$routeParams",
    function ($scope, Tiers, $routeParams) {

      var parentID = $routeParams.parentID;

      if(parentID == '0'){
        parentID = null;
      }

      $scope.reset = function () {
        Tiers.list_children_and_count_users(parentID, function (err, results) {
          $scope.error = err;
          $scope.tiers = results;
        });

        var currentTier = {
          tierID : parentID
        }

        Tiers.find_tier(currentTier, function (err, results) {
          $scope.error = err;
          console.log(results);
          $scope.currentTier = results;
        });

      }

      $scope.add = function (newTier) {
        var newTier = {
          title : newTier.title,
          parentID : parentID
        }
        Tiers.add_tier(newTier, function (err, results) {
          $scope.reset();
        });
      };

       $scope.delete = function (tierID) {
        var tier = {
          tierID : tierID
        }
        Tiers.delete_tier(tier, function (err, results) {
          $scope.reset();
        });
      };

      $scope.reset();
    }
  ]);
