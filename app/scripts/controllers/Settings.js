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
          $scope.updateSessionSettings($scope.user._id, $scope.editUser._id);
        });
      };

      $scope.updateUserTier = function (id, title) {
        $scope.saved = null;
        $scope.editUser._tier._id = id;

        Users.update($scope.editUser, function (user) {
          $scope.editUser._tier.title = title;
          $scope.saved = "true";
          $scope.updateSessionSettings($scope.user._id, $scope.editUser._id);
        });
      };

      $scope.updateSessionSettings = function (userId, editUserId) {

        console.log(userId, editUserId)
        if (userId === editUserId) {
          Session.updateSession($scope.user, function (data) {

            console.log("update-----", data)
            $scope.user = data;
          });
        }
      };
    }
  ]);
