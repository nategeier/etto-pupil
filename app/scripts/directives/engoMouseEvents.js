"use strict";

angular.module( "engoPupil" )
.directive( "moveSide", [ function() {
  return {
    restrict: "EA",

    link: function postLink( scope, element, attrs ) {

      element.bind( "mouseover", function() {
        TweenMax.to( element, 0.3, { x: -10 });
      });

      element.bind( "mouseout", function() {
        TweenMax.to( element, 0.3, { x: 0 });
      });

    }
  };
}])
.directive( "sinkIn", [ function() {
  return {
    restrict: "EA",

    link: function postLink( scope, element, attrs ) {

      element.bind( "mouseover", function() {
        TweenMax.to( element, 0.3, { scaleX: 0.95, scaleY: 0.95, backgroundColor:"#eee" });
      });

      element.bind( "mouseout", function() {
        TweenMax.to(element, 0.3, { scaleX: 1, scaleY: 1, backgroundColor:"none" });
      });

    }
  };
}]);

