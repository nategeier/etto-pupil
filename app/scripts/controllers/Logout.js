"use strict";

angular.module("engoPupil")
  .controller("LogoutCtrl", ["$scope", "$location", "$http", "Session",
    function ($scope, $location, $http, Session) {

      var handleSuccess = function (data) {
        $location.path("/");
      };
      Session.destroySession().success(handleSuccess);

    }
  ]);
