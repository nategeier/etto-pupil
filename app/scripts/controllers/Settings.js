"use strict";

angular.module("ettoPupil")
  .controller("SettingsCtrl", ["$scope", "Tiers", "$routeParams", "Users", "Store", "Session",
    function ($scope, Tiers, $routeParams, Users, Store, Session) {

      var id = $routeParams.userID;

      Users.fullDetails(id, function (user) {
        $scope.editUser = user;
        Store.findCredit(user._tier._company, function (credit) {
          $scope.credit = credit;
        });
      });

      Users.listUserCoursesRecords(id, function (records) {
        $scope.userRecords = records;
      });

      $scope.updateUser = function () {
        $scope.saved = null;
        Users.update($scope.editUser, function (user) {
          $scope.saved = "true";

          Session.updateSession(user, function (data) {
            $scope.user = data;
          });
        });
      };
    }
  ]);
