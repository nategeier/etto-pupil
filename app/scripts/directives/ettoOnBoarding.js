"use strict";

angular.module("ettoPupil")
  .directive("ettoOnBoarding", [

    function () {
      return {
        restrict: "EA",
        templateUrl: "/views/directives/ettoOnBoarding.html",
        link: function (scope, element, attrs) {

        }
      };
    }
  ]);
