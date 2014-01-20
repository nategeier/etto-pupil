"use strict";

angular.module("ettoPupil")
  .controller("ReportsCtrl", ["$scope", "Tiers", "$routeParams", "$location", "Users",
    function($scope, Tiers, $routeParams, $location, Users) {

      $scope.viewChildren = function(link) {
        $location.path(link);
      };

      $scope.parentID = $routeParams.parentID;

      if ($scope.parentID === "0") {
        $scope.parentID = null;
      }

      var obj = {
        _id: $scope.parentID
      };


      $scope.listUsers = function(){
        Users.listUsersInTier($scope.parentID, function(users) {
          $scope.users = users;
        });
      }
      

      $scope.reset = function() {
        Tiers.listChildrenAndCountUsers(obj, function(results) {
          $scope.tiers = results;
        });


        Tiers.findTier($scope.parentID, function(results) {
          $scope.currentTier = results;
        });

      };

      $scope.add = function(newTier) {
        newTier = {
          title: newTier.title,
          parent: $scope.parentID
        };
        Tiers.addTier(newTier, function(results) {
          $scope.reset();
          $scope.newTier.title = "";
        });
      };

      $scope.remove = function(tierID) {
        var tier = {
          _id: tierID,
          parent: $scope.parentID
        };
        Tiers.removeTier(tier, function(results) {
          $scope.reset();
        });
      };

      $scope.reset();
      $scope.listUsers();
    }
  ]);