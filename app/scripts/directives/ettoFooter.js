"use strict";

angular.module("ettoPupil")
  .directive("ettoFooter", [

    function () {
      return {
        templateUrl: "/views/directives/ettoFooter.html",
        restrict: "AE"
      };
    }
  ]);
