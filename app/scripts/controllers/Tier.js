"use strict";

angular.module("ettoPupil")
  .controller("TierCtrl", ["$scope", "Tiers", "$routeParams",
    function ($scope, Tiers, $routeParams) {

      $scope.tierID = $routeParams.id;

      $scope.reset = function () {
        Tiers.findTier($scope.tierID, function (results) {

          $scope.tier = results;
        });
      };

      $scope.updateTier = function () {
        Tiers.updateTier($scope.tier, function (results) {
          $scope.tier = results;
        });
      };

      $scope.reset();
    }
  ]);
