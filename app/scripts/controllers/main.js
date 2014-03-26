"use strict";

angular.module("ettoPupil")
  .controller("MainCtrl", ["$scope", "$location", "Session",
    function ($scope, $location, Session) {

      Session.getSession(function (data) {
        if (data) {
          $location.path("/etto");
        }
      });

    }
  ]);
