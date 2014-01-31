"use strict";

angular.module("ettoPupil")
  .controller("SettingsCtrl", ["$scope", "Tiers", "$routeParams", "Users",
    function ($scope, Tiers, $routeParams, Users) {

      var id = $routeParams.userID;

      Users.fullDetails(id, function (user) {
        $scope.editUser = user;
      });

      $scope.updateUser = function () {
        $scope.saved = null;
        Users.update($scope.editUser, function (user) {
          console.log("user----- sucess!!!", user);

          $scope.saved = "true";
        });
      };
    }
  ]);
