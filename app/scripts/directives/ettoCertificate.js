"use strict";

angular.module("ettoPupil")
  .directive("ettoCertificate", [

    function () {
      return {
        templateUrl: "/views/directives/ettoCertificate.html",
        restrict: "AE"
      };
    }
  ]);
