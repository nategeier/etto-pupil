"use strict";

angular.module("ettoPupil")
  .directive("ettoRegisterModal", ["Tiers", "Users",

    function () {

      return {

        restrict: "AE",
        controller: function ($scope, $modal, Tiers, $location, Users) {

          $scope.$watch('user', function() {

            if($scope.user && !$scope.user._tier){
              $scope.register();
            }
          })


          $scope.register = function () {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoRegister.html",
              controller: function ($scope, $modalInstance) {
                $scope.tier = {};
                $scope.handleLogin = function () {
                  $modalInstance.close($scope.tier);
                };
              }
            });
            modal.result.then(function (tier) {
              var newTier = {
                title : tier.title
              }
              Tiers.add_tier(newTier, function (err, newTier) {

                var obj = {
                  tierID : newTier._id,
                  userID : $scope.user._id
                }

                Users.update_users_tier(obj, function(err, results){

                  $scope.user._tier = newTier._id;
                  $location.path($scope.redirectTo);
                })
                
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
