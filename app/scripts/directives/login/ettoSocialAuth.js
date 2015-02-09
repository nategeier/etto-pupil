"use strict";

angular.module("ettoPupil")
  .directive("ettoSocialAuth", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $location) {

          var ssoPath = "api/v1/";
          var baseBath = "http://localhost:9010/";
          if ($location.host() === "coursetto.com") {
            baseBath = "https://coursetto.com/";
            ssoPath = "";
          }

          $scope.handleAuth = function (service) {
            window.location.assign(baseBath + ssoPath + "auth/" + service);
          };
        }
      };
    }
  ]);
