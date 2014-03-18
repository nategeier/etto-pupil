"use strict";

angular.module("ettoPupil")
  .directive("ettoLoginModal", [

    function () {
      return {
        //templateUrl: "/views/directives/ettoLoginBtns.html",
        restrict: "AE",
        controller: function ($scope, $modal, Session, $location, $route) {
          $scope.login = function () {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoLoginModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.user = {};
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
              if ($location.path() === redir) {
                $route.reload();
              } else {
                $location.path(redir);
              }
              //$location.path("/etto");
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
