"use strict";

angular.module("ettoPupil")
  .directive("headTree", [

    function () {
      return {
        restrict: "EA",
        template: "<div class='tree-btn' move-side><h2>All {{totUsers}}</h2></div>",

        link: function postLink(scope, element, attrs) {}
      };
    }
  ])
  .directive("medTree", [

    function () {
      return {
        restrict: "EA",
        template: "<div class='tree-btn' move-side><h4>{{medLevel.medTitle}}</h4></div>",

        link: function postLink(scope, element, attrs) {
          TweenMax.from(element, 0.5, {
            scaleY: 0,
            opacity: 0
          });
        }
      };
    }
  ])
  .directive("lowTree", [

    function () {
      return {
        restrict: "EA",
        template: "<div class='tree-btn' move-side><p>{{lowerLevel.lowTitle}}</p></div>",
        link: function postLink(scope, element, attrs) {
          TweenMax.from(element, 0.5, {
            delay: 0.3,
            scaleY: 0,
            opacity: 0
          });
        }
      };
    }
  ])
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
  ]);