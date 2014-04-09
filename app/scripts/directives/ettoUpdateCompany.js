"use strict";

angular.module("ettoPupil")
  .directive("ettoUpdateCompany", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, Tiers) {

          $scope.updateLeaderboard = function () {

            console.log($scope.user.auth);

            if ($scope.user.auth.canEditCompany) {
              var tier = {
                _id: $scope.user._tier._company,
                leaderboard: $scope.company.leaderboard,
                logo: $scope.company.logo
              };
              Tiers.updateLeaderboard(tier, function (results) {
                ///Saved
              });
            }
          };

          $scope.updateMainImg = function () {
            $scope.showAssetLibrary(function (asset) {
              $scope.company.leaderboard.imgUrl = asset.url;
              $scope.updateLeaderboard();
            });
          };

          $scope.updateLogo = function () {
            $scope.showAssetLibrary(function (asset) {
              $scope.company.logo = asset.url;
              $scope.updateLeaderboard();
            });
          };

        },
        link: function (scope, element, attrs) {

        }
      };
    }
  ]);
