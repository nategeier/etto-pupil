"use strict";

angular.module("ettoPupil")
  .directive("ettoSession", ["Store",

    function (Store) {
      return {
        restrict: "EA",

        controller: function ($scope, Session) {

          $scope.$on("401", function () {
            $scope.login();
          });

          $scope.updateSession = function () {
            Session.getSession(function (data) {
              //Session.treatSession(data);
              $scope.user = data;

              if ($scope.user && $scope.user.auth.canPurchase) {
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
