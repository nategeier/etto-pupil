"use strict";

angular.module("ettoPupil")
  .directive("ettoLoginModal", [

    function() {
      return {
        template: "<a class='btn btn-primary btn-sm top-logout-btn' href='#' ng-click='login()'>Login</a>",
        restrict: "AE",
        controller: function($scope, $modal, Session, $location) {
          $scope.login = function() {
            var modal = $modal.open({
              templateUrl: "/views/directives/ettoLoginModal.html",
              controller: function($scope, $modalInstance) {
                $scope.user = {};
                $scope.handleLogin = function() {
                  $modalInstance.close($scope.user);
                };
              }
            });
            modal.result.then(function(user) {
              Session.authenticate(user, function(data) {
                if (data.user) {
                  $location.path($scope.redirectTo);
                }
              });
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);