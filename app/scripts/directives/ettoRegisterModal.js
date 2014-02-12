"use strict";

angular.module("ettoPupil")
  .directive("ettoRegisterModal", ["Tiers", "Users", "Session",

    function () {

      return {
        restrict: "AE",
        controller: function ($scope, $modal, Tiers, $location, Users, Session) {

          $scope.register = function (user) {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoRegister.html",
              controller: function ($scope, $modalInstance) {

                $scope.handleLogin = function (user) {

                  var newTier = {
                    title: user.tier.title
                  };
                  Tiers.createCompany(newTier, function (tier) {

                    user._tier = tier._id;

                    Users.updateUsersTier(user, function (data) {
                      if (data.err) {
                        $scope.err = data.err;
                      } else {
                        $modalInstance.close(data);
                      }
                    });
                  });

                };
              }
            });
            modal.result.then(function (user) {

              Session.updateSession(user, function (data) {
                $scope.user = data;
                $location.path("/etto");
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
