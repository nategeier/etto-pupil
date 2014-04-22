"use strict";

angular.module("ettoPupil")
  .directive("ettoResetPassword", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Tiers, Security, $routeParams) {

          var verifyPasswordReset = function () {

            Security.verifyPasswordReset($routeParams.code, function (results) {
              $scope.user = results;
              $scope.user.resetCode = $routeParams.code;
            });
          };

          $scope.updatePassword = function () {

            if ($scope.user && $scope.user.password) {
              Security.updatePassword($scope.user, function (results) {
                $scope.err = {};
                if (results.message) {
                  $scope.err.message = results.message;
                } else {
                  $scope.err.message = "Password has been reset";
                  $scope.login();
                }

              });
            } else {
              $scope.err = {};
              $scope.err.message = "Please enter a valid password";
            }

          };

          verifyPasswordReset();

        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
