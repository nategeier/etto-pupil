"use strict";

angular.module("engoPupil")
  .directive("engoLogin", [

    function () {
      return {
        restrict: "E",
        templateUrl: "views/directives/engoLogin.html",
      };
    }
  ]);
