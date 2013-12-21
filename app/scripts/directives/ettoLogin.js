"use strict";

angular.module("ettoPupil")
  .directive("ettoLogin", [

    function () {
      return {
        restrict: "E",
        templateUrl: "/views/directives/ettoLogin.html",
      };
    }
  ]);
