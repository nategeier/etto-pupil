"use strict";

angular.module("ettoPupil")
  .directive("ettoLoggedInNav", [

    function () {
      return {
        templateUrl: "/views/directives/ettoLoggedInNav.html",
        restrict: "E",
        controller: function ($scope, $state, Session) {
          $scope.destroySession = function (redir) {
            Session.destroySession(function () {
              $state.go("landing");
            });
          };
        }
      };
    }
  ]);
