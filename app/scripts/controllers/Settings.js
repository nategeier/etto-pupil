"use strict";

angular.module("ettoPupil")
  .controller("SettingsCtrl", ["$scope", "Tiers", "$routeParams", "Users", "Store", "Session",
    function ($scope, Tiers, $routeParams, Users, Store, Session) {

      var id = $routeParams.userID;

      $scope.addEmail = function () {
        $scope.editUser.emails.push(null);
      };

      $scope.setCourseTime = function (takenTime) {

        console.log("takenTime", takenTime);
        var now = moment(takenTime);

        console.log(now._d);
        return now._d;

      };

      $scope.removeEmail = function (index) {

        if (index > -1 && $scope.editUser.emails.length > 1) {
          $scope.editUser.emails.splice(index, 1);
        }
        $scope.updateUser();
      };

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

        $scope.editUser.emails = $scope.editUser.emails.filter(function (e) {
          return e;
        });

        Users.update($scope.editUser, function (data) {
          if (data.err) {
            $scope.err = data.err;
          } else {
            $scope.saved = "true";
            $scope.updateSessionSettings($scope.user._id, $scope.editUser._id);
          }

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

        if (userId === editUserId) {
          Session.updateSession($scope.user, function (data) {
            $scope.user = data;
          });
        }
      };

      $scope.updateAvatar = function () {
        $scope.showAssetLibrary(200, 200, function (asset) {
          $scope.editUser.avatarUrl = asset.url;
          $scope.updateUser();
        });
      };
    }
  ]);
