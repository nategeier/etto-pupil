"use strict";

angular.module("ettoPupil")
  .controller("MainCtrl", ["$scope", "$http", "$location", "Session",
    function ($scope, $http, $location, Session) {

      $scope.submitLogin = function () {
        $http({
          method: "POST",
          url: "/api/v1/sessions/create_brand",
          data: $scope.user
        })
          .success(function (data, status, headers, config) {
            console.log(data);

            if (data.err) {
              $scope.err = data.err;

            } else {
              //$location.path("/etto");
              $scope.err = "The learning world thanks you for your support";
            }
          })
          .error(function (data, status, headers, config) {
            Session.isLogged = false;
            Session.user = null;
          });
      };

    }
  ]);
