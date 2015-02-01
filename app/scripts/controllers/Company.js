"use strict";

angular.module("ettoPupil")
  .controller("CompanyCtrl", ["$scope", "$stateParams", "Tiers", "WhiteLabel", "Fonts", "Tier",
    function ($scope, $stateParams, Tiers, WhiteLabel, Fonts, Tier) {

      var companyId = $stateParams.companyId;

      $scope.fonts = Fonts;

      Tier.findTier(companyId, function (tier) {
        $scope.tier = tier;
      });

      $scope.updateTier = function () {
        Tiers.updateTier($scope.tier, function (data) {
          WhiteLabel.setColors(data.colors);
          WhiteLabel.setFonts(data.font);
          $scope.company = data;
        });
      };

      $scope.updateMainImg = function () {
        $scope.showAssetLibrary(400, 200, function (asset) {
          $scope.tier.leaderboard.imgUrl = asset.url;
          $scope.updateTier();
        });
      };
    }
  ]);
