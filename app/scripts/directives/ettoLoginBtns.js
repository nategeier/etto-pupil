"use strict";

angular.module("ettoPupil")
  .directive("ettoLoginBtns", [

    function () {
      return {
        templateUrl: "/views/directives/ettoLoginBtns.html",
        restrict: "AE",
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);
