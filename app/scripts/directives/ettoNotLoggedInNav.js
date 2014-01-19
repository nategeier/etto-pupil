"use strict";

angular.module("ettoPupil")
  .directive("ettoNotLoggedInNav", [

    function() {
      return {
        templateUrl: "/views/directives/ettoNotLoggedInNav.html",
        restrict: "E",
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);