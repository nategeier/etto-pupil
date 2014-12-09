"use strict";

angular.module("ettoPupil")
  .controller("TrialEndsCtrl", ["$scope", "$routeParams", "Session", "Tier", "Tiers", "WhiteLabel", "Fonts",
    function ($scope, $routeParams, Session, Tier, Tiers, WhiteLabel, Fonts) {

      $scope.reset = function () {
        Tier.getCompany($scope.tier._id, function (results) {
          $scope.tier = results;
          WhiteLabel.setColors($scope.tier.colors);
          WhiteLabel.setFonts($scope.tier.font);
        });
      };

      $scope.updateTier = function () {
        Tiers.updateTier($scope.tier, function (results) {
          $scope.tier = results;

          WhiteLabel.setColors($scope.tier.colors);
          WhiteLabel.setFonts($scope.tier.font);
        });
      };

      $scope.dateOptions = {
        formatYear: "yy",
        startingDay: 1
      };

      $scope.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"];
      $scope.format = $scope.formats[0];

    }
  ]);
