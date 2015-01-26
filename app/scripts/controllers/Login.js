"use strict";

angular.module("ettoPupil")
  .controller("LoginCtrl", ["$scope", "$modalInstance", "Session", "$state", "$stateParams",

    function ($scope, $modalInstance, Session, $state, $stateParams) {
      $scope.user = {};

      $scope.cancel = function () {
        $modalInstance.close();
      };

      $scope.handleLogin = function (user) {

        Session.authenticate(user, function (data) {
          if (data.message) {
            $scope.err = data;
          } else {
            $scope.user = data;
            window.location.reload();
          }
        });
      };

    }
  ]);
