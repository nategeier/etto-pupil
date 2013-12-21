"use strict";

angular.module("engoPupil")
  .directive("engoLoggedInNav", [

    function () {
      return {
        templateUrl: "/views/directives/engoLoggedInNav.html",
        restrict: "E",
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);
