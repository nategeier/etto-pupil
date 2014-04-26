"use strict";

angular.module("ettoPupil")
  .controller("InviteCtrl", ["$scope", "$location", "Session", "$routeParams", "Users", "Tier",
    function ($scope, $location, Session, $routeParams, Users, Tier) {

      $scope.newUser = {};

      Users.inviteDetails($routeParams.id, function (user) {
        $scope.newUser = user;
        getCompnay();

      });

      var getCompnay = function () {
        Tier.getCompany($scope.newUser._tier, function (results) {
          $scope.company = results;
        });
      };

      $scope.confirmUser = function () {

        Users.updateUsersTier($scope.newUser, function (data) {
          if (data.err) {
            $scope.err = data.err;
          } else {
            $location.path("/etto");
          }
        });
      };

    }
  ]);
