"use strict";

angular.module("engoPupil")
  .directive("engoNotLoggedInNav", [

    function () {
      return {
        templateUrl: "views/directives/engoNotLoggedInNav.html",
        restrict: "E",
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);
