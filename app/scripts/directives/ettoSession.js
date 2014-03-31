"use strict";

angular.module("ettoPupil")
  .directive("ettoSession", ["Store", "$location",

    function (Store, $location) {
      return {
        restrict: "EA",

        controller: function ($scope, Session) {

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

              } else if ($scope.user && $scope.user.auth.canPurchase) {
                Store.findCredit($scope.user._tier._company, function (results) {
                  $scope.credits = results.credits;
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
