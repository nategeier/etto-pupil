"use strict";

angular.module("ettoPupil")
  .controller("InviteCtrl", ["$scope", "$location", "Session", "$routeParams", "Users",
    function ($scope, $location, Session, $routeParams, Users) {

      $scope.newUser = {};

      Users.fullDetails($routeParams.id, function (user) {
        $scope.newUser = user;
      });

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
