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

                $scope.newUser = {
                  tierTitle: "",
                  name: "",
                  email: [],
                  username: "",
                  password: ""
                };

                $scope.handleLogin = function () {

                  var newTier = {
                    title: $scope.newUser.tierTitle
                  };

                  Tiers.createCompany(newTier, function (tier) {

                    $scope.newUser._tier = tier._id;

                    Users.saveNewUser($scope.newUser, function (data) {
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
