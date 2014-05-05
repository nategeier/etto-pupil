"use strict";

angular.module("ettoPupil")
  .directive("ettoSendForgotPassword", [

    function () {
      return {
        restrict: "AE",
        template: "<a class='btn btn-default btn-xs' href='#' ng-click='ettoSendForgotPassword()'>Forgot Password</a>",
        controller: function ($scope, Security) {

          $scope.ettoSendForgotPassword = function () {

            if (!$scope.user.username || $scope.user.username === "") {
              $scope.err = {};
              $scope.err.message = "Please enter your email";
            } else {
              Security.sendForgotPw($scope.user.username, function (results) {
                $scope.err = {};
                if (results.message) {
                  $scope.err.message = results.message;
                } else {
                  $scope.err.message = "Sent reset instructions to " + $scope.user.username;
                }
              });
            }
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
