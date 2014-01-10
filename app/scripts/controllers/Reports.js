"use strict";

angular.module("ettoPupil")
  .controller("ReportsCtrl", ["$scope", "Tiers", "$routeParams", "Users",
    function ($scope, Tiers, $routeParams, Users) {

      $scope.parentID = $routeParams.parentID;

      if($scope.parentID === '0'){
        $scope.parentID = null;
      }

      var obj = {
        _id: $scope.parentID
      };

      Users.listUsersInTier($scope.parentID, function(users){
        console.log(users)
        $scope.users = users;
      });

      $scope.reset = function () {
        Tiers.listChildrenAndCountUsers(obj, function (results) {
          $scope.tiers = results;
        });


        Tiers.findTier($scope.parentID, function (results) {
          $scope.currentTier = results;
        });

      };

      $scope.add = function (newTier) {
        var newTier = {
          title : newTier.title,
          parent : $scope.parentID
        };
        Tiers.addTier(newTier, function (results) {
          $scope.reset();
          $scope.newTier.title = "";
        });
      };

      $scope.remove = function (tierID) {
        var tier = {
          _id : tierID,
          parent : $scope.parentID
        };
        Tiers.removeTier(tier, function (results) {
          $scope.reset();
        });
      };

      $scope.reset();
    }
  ]);
