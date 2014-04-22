"use strict";

angular.module("ettoPupil")
  .directive("ettoLoginModal", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Session, $location, $route, Security) {

          $scope.login = function () {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoLoginModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.user = {};

                $scope.cancel = function () {
                  $modalInstance.close();
                };

                $scope.sendForgotPw = function () {
                  if (!$scope.user.username || $scope.user.username === "") {
                    $scope.err = {};
                    $scope.err.message = "Please enter your email";
                  } else {
                    Security.sendForgotPw($scope.user.username, function (results) {
                      $scope.err = {};
                      $scope.err.message = "Sent reset instructions to " + $scope.user.username;
                    });
                  }
                };

                $scope.handleLogin = function (user) {

                  Session.authenticate(user, function (data) {
                    if (data.message) {
                      $scope.err = data;
                    } else {
                      $modalInstance.close(user);
                    }
                  });
                };
              }
            });
            modal.result.then(function (user) {

              var redir = "/etto";

              if (user) {
                if ($location.path() === redir) {
                  $route.reload();
                } else {
                  $location.path(redir);
                }
              }
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
