"use strict";

angular.module("ettoPupil")
  .directive("ettoRegisterModal", ["Tiers", "Users", "Session",

    function() {

      return {

        restrict: "AE",
        controller: function($scope, $modal, Tiers, $location, Users, Session) {

          $scope.$watch("user", function() {
            if ($scope.user && !$scope.user._tier) {
              $scope.register();
            }
          });


          $scope.register = function() {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoRegister.html",
              controller: function($scope, $modalInstance) {
                $scope.tier = {};
                $scope.handleLogin = function() {
                  $modalInstance.close($scope.tier);
                };
              }
            });
            modal.result.then(function(tier) {
              var newTier = {
                title: tier.title
              };
              Tiers.addTier(newTier, function(tier) {

                var obj = {
                  tierID: tier._id,
                  userID: $scope.user._id
                };


                Users.updateUsersTier(obj, function(data) {

                  //var user = $scope.user;

                  Session.updateSession($scope.user, function(data) {
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