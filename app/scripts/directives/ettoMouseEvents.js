"use strict";


angular.module("ettoPupil")
  .directive("moveSide", [

    function() {
      return {
        restrict: "EA",

        link: function postLink(scope, element, attrs) {

          element.bind("mouseover", function() {
            TweenMax.to(element, 0.3, {
              x: -10
            });
          });

          element.bind("mouseout", function() {
            TweenMax.to(element, 0.3, {
              x: 0
            });
          });

        }
      };
    }
  ])
  .directive("sinkIn", [

    function() {
      return {
        restrict: "EA",

        link: function postLink(scope, element, attrs) {

          element.bind("mousedown", function() {
            TweenMax.to(element, 0.2, {
              backgroundColor: "#386b86"
            });
          });

          element.bind("mousedown", function() {
            TweenMax.to(element, 0.2, {
              backgroundColor: "#386b86"
            });
          });

          element.bind("mouseup", function() {
            TweenMax.to(element, 0.2, {
              backgroundColor: "none"
            });
          });

          element.bind("mouseover", function() {
            TweenMax.to(element, 0.2, {
              backgroundColor: "#eee"
            });
          });

          element.bind("mouseout", function() {
            TweenMax.to(element, 0.1, {
              backgroundColor: "none"
            });
          });

        }
      };
    }
  ]);