"use strict";

angular.module("ettoPupil")
  .directive("moveSide", [

    function () {
      return {
        restrict: "EA",

        link: function postLink(scope, element, attrs) {

          var delay = 0.4;

          if (attrs.delay) {
            delay = Number(attrs.delay);
          }
          if (scope.blockEvent !== "none") {
            TweenMax.from(element, 0.6, {
              delay: delay,
              x: 100,
              opacity: 0
            });
          }
        }
      };
    }
  ])
  .directive("sinkIn", [

    function () {
      return {
        restrict: "EA",

        link: function postLink(scope, element, attrs) {

          var tranTime = 0.2;

          element.bind("mouseover", function () {
            TweenMax.to(element, tranTime, {
              scaleX: 0.95,
              scaleY: 0.95
            });

          });

          element.bind("mouseout", function () {
            TweenMax.to(element, tranTime, {
              scaleX: 1,
              scaleY: 1
            });

          });

        }
      };
    }
  ]);
