"use strict";

angular.module("ettoPupil")
  .directive("ettoSession", ["Store", "$location",

    function (Store, $location) {
      return {
        restrict: "EA",

        controller: function ($scope, Session, Tier, WhiteLabel) {

          $scope.$on("401", function () {
            $scope.login();
          });

          $scope.destroySession = function (redir) {
            Session.destroySession(function () {
              $location.path(redir);
            });
          };

          $scope.updateSession = function () {

            Session.getSession(function (data) {
              $scope.user = data;

              if (!$scope.user.isBeta) {
                $scope.destroySession("/beta");
              } else if ($scope.user) {
                Store.findCredit($scope.user._tier._company, function (results) {
                  $scope.credits = results.credits;
                });

                Tier.findTier($scope.user._tier._company, function (company) {
                  $scope.company = company;
                  if (company.colors) {
                    WhiteLabel.setColors(company.colors);
                    WhiteLabel.setFonts(company.font);
                  }
                });
              }

            });
          };

          $scope.updateSession();

        },
        link: function (scope, element, attrs) {

        }
      };
    }
  ]);
