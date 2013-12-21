"use strict";

angular.module("ettoPupil")
  .directive("scaleBar", [

    function () {
      return {
        restrict: "A",
        link: function postLink(scope, element, attrs) {
          TweenMax.from(element, 1, {
            scaleY: 0,
            opacity: 0
          });
        }
      };
    }
  ]);
