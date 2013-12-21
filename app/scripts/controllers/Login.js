"use strict";

angular.module("ettoPupil")
  .controller("LoginCtrl", ["$scope", "$http", "$location", "Session", "$routeParams",
    function ($scope, $http, $location, Session, $routeParams) {

      $scope.confInvite = function (user) {
        user.userID = $routeParams.userID;

        Session.register_invite(user, function (user) {
          console.log("user:-----------", user);
          $location.path("/etto");
        });

      };
    }
  ]);
