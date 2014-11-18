"use strict";

angular.module("ettoPupil")
  .directive("moveSide", [

    function () {
      return {
        restrict: "EA",

        link: function postLink(scope, element, attrs) {

          element.bind("mouseover", function () {
            TweenMax.to(element, 0.3, {
              x: -10
            });
          });

          element.bind("mouseout", function () {
            TweenMax.to(element, 0.3, {
              x: 0
            });
          });

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
