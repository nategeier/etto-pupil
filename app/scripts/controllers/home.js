"use strict";

angular.module("ettoPupil")
  .controller("HomeCtrl", ["$scope", "$compile", "Session",
    function ($scope, $compile, Session) {

      Session.get_session(function (data) {
        Session.treat_session(data);
        $scope.user = data;
      });

    }
  ]);
