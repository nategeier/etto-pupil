"use strict";

angular.module("ettoPupil")
  .controller("InviteCtrl", ["$scope", "$location", "Session", "$routeParams", "Users", "Tier", "WhiteLabel",
    function ($scope, $location, Session, $routeParams, Users, Tier, WhiteLabel) {

      $scope.newUser = {};

      Users.inviteDetails($routeParams.id, function (user) {
        $scope.newUser = user;
        getCompnay();
      });

      var getCompnay = function () {
        Tier.getCompany($scope.newUser._tier, function (results) {
          $scope.company = results;
          WhiteLabel.setColors($scope.company.colors);
          WhiteLabel.setFonts($scope.company.font);
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
