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

          var tranTime = 0.3;

          element.bind("mousedown", function () {
            TweenMax.to(element, tranTime, {
              backgroundColor: "#386b86"
            });
          });

          element.bind("mouseup", function () {
            TweenMax.to(element, tranTime, {
              backgroundColor: "none"
            });
          });

          element.bind("mouseover", function () {
            TweenMax.to(element, tranTime, {
              backgroundColor: "#889ba4",
              color: "#fff"
            });

            TweenMax.to(element.find("h5"), tranTime, {
              color: "#fff"
            });

            TweenMax.to(element.find("h4"), tranTime, {
              color: "#fff"
            });

          });

          element.bind("mouseout", function () {
            TweenMax.to(element, tranTime, {
              backgroundColor: "#fff",
              color: "#889ba4"
            });

            TweenMax.to(element.find("h5"), tranTime, {
              color: "#889ba4"
            });

            TweenMax.to(element.find("h4"), tranTime, {
              color: "#889ba4"
            });

          });

        }
      };
    }
  ]);
