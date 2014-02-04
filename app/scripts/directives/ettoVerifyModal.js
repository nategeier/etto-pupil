"use strict";

angular.module("ettoPupil")
  .directive("ettoVerifyModal", ["Tiers", "Users", "Session",

    function () {

      return {

        restrict: "AE",
        controller: function ($scope, $modal, Tiers, $location, Users, Session) {
          var user = null;
          $scope.$watch("user", function () {
            if ($scope.user && !$scope.user._tier) {
              user = $scope.user;
              $scope.register();
            }
          });

          $scope.register = function () {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoVerifyModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.user = user;
                $scope.handleLogin = function () {
                  $modalInstance.close($scope.user);
                };
              }
            });
            modal.result.then(function (user) {
              var newTier = {
                title: user.tier.title
              };

              Tiers.createCompany(newTier, function (tier) {

                user._tier = tier._id;

                Users.updateUsersTier(user, function (data) {

                  Session.updateSession(data, function (data) {
                    $scope.user = data;
                    $location.path($scope.redirectTo);
                  });
                });
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
