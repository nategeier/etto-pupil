"use strict";

angular.module("ettoPupil")
  .directive("ettoResetPassword", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Tiers, Security, $stateParams) {

          var verifyPasswordReset = function () {

            Security.verifyPasswordReset($stateParams.code, function (results) {
              $scope.user = results;
              $scope.user.resetCode = $stateParams.code;
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
