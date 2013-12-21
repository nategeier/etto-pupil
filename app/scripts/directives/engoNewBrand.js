"use strict";

angular.module("engoPupil")
  .directive("engoNewBrand", [

    function () {
      return {
        restrict: "E",
        templateUrl: "/views/directives/engoNewBrand.html",
        link: function postLink(scope, element, attrs) {
          TweenMax.from(element, 1, {
            scaleY: 0,
            opacity: 0
          });
        }
      };
    }
  ]);
