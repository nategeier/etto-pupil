"use strict";

angular.module("ettoPupil")
  .directive("ettoLoginModal", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Session, $location, $state, $stateParams) {

          $scope.login = function () {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoLoginModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.user = {};

                $scope.cancel = function () {
                  $modalInstance.close();
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

              if (user) {
                $state.transitionTo("home");
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
