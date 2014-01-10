"use strict";

angular.module("ettoPupil")
  .controller("ReportsCtrl", ["$scope", "Tiers", "$routeParams",
    function ($scope, Tiers, $routeParams) {

      var parentID = $routeParams.parentID;

      if(parentID == '0'){
        parentID = null;
      }

      var obj = {
        _id: parentID
      }

      $scope.reset = function () {
        Tiers.list_children_and_count_users(obj, function (results) {
          $scope.tiers = results;
        });

        var currentTier = {
          _id : parentID
        }

        Tiers.find_tier(currentTier, function (results) {
          $scope.currentTier = results;
        });

      }

      $scope.add = function (newTier) {
        var newTier = {
          title : newTier.title,
          parent : parentID
        }
        Tiers.add_tier(newTier, function (results) {
          $scope.reset();
          $scope.newTier.title = '';
        });
      };

       $scope.remove = function (tierID) {
        var tier = {
          _id : tierID,
          parent : parentID
        }
        Tiers.remove_tier(tier, function (results) {
          $scope.reset();
        });
      };

      $scope.reset();
    }
  ]);
