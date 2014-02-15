"use strict";

angular.module("ettoPupil")
  .controller("LoginCtrl", ["$scope", "$http", "$location", "Session", "$routeParams",
    function ($scope, $http, $location, Session, $routeParams) {

      $scope.inviteUser = {};
      $scope.inviteUser._id = $routeParams.id;
      /*
      $scope.confInvite = function (user) {
        user.userID = $routeParams.userID;
        Session.register_invite(user, function (user) {
          $location.path("/etto");
        });
      };
      */
    }
  ]);
