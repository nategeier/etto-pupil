"use strict";

angular.module("ettoPupil")
  .directive("ettoRegisterModal", ["Tiers", "Users", "Session",

    function () {

      return {
        restrict: "AE",
        controller: function ($scope, $modal, Tiers, $location, Users, Session) {

          $scope.register = function () {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoRegister.html",
              controller: function ($scope, $modalInstance) {

                $scope.cancel = function () {
                  $modalInstance.close();
                };

                $scope.handleLogin = function (newUser) {

                  if (!newUser.tierTitle || !newUser.name || !newUser.emails || !newUser.username || !newUser.password) {
                    $scope.err = "Please fill out all of the information";
                  } else {
                    $scope.newUser = newUser;
                    crateCompany();
                  }
                };

                var crateCompany = function () {
                  var newTier = {
                    title: $scope.newUser.tierTitle
                  };

                  Tiers.createCompany(newTier, function (tier) {
                    createUser(tier);
                  });
                };

                var createUser = function (tier) {
                  $scope.newUser._tier = tier._id;
                  Users.saveNewUser($scope.newUser, function (data) {
                    if (data.err) {
                      $scope.err = data.err;
                    } else {
                      $modalInstance.close(data);
                    }
                  });
                };
              }
            });
            modal.result.then(function (user) {
              if (user) {
                Session.updateSession(user, function (data) {
                  $scope.user = data;
                  $location.path("/etto");
                });
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
