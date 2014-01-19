"use strict";

angular.module("ettoPupil")
  .directive("ettoNewBrand", [

    function() {
      return {
        restrict: "E",
        templateUrl: "/views/directives/ettoNewBrand.html",
        link: function postLink(scope, element, attrs) {
          TweenMax.from(element, 1, {
            scaleY: 0,
            opacity: 0
          });
        }
      };
    }
  ]);