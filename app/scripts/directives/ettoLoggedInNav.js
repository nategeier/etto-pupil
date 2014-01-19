"use strict";

angular.module("ettoPupil")
  .directive("ettoLoggedInNav", [

    function() {
      return {
        templateUrl: "/views/directives/ettoLoggedInNav.html",
        restrict: "E",
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);