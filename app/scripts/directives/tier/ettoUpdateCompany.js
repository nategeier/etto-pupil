"use strict";

angular.module("ettoPupil")
  .directive("ettoUpdateCompany", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, Tiers, Tier, Session) {
          /*
          Session.getSession(function (user) {
            $scope.user = user;
            Tier.getCompany($scope.user._tier._id, function (company) {
              $scope.company = company;
            });
          });
          */
          $scope.updateLeaderboard = function () {

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
            $scope.showAssetLibrary(400, 200, function (asset) {
              $scope.company.leaderboard.imgUrl = asset.url;
              $scope.updateLeaderboard();
            });
          };

          $scope.updateLogo = function () {
            console.log("reached comp")
            $scope.showAssetLibrary(55, 55, function (asset) {
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
