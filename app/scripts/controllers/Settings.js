"use strict";

angular.module("ettoPupil")
  .controller("SettingsCtrl", ["$scope", "Tiers", "$routeParams", "Users", "Store",
    function ($scope, Tiers, $routeParams, Users, Store) {

      var id = $routeParams.userID;

      Users.fullDetails(id, function (user) {
        $scope.editUser = user;
        Store.findCredit(user._tier._company, function (credit) {
          $scope.credit = credit;
        });
      });

      $scope.updateUser = function () {
        $scope.saved = null;
        Users.update($scope.editUser, function (user) {
          $scope.saved = "true";
        });
      };

    }
  ]);
