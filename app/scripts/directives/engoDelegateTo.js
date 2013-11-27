"use strict";

angular.module("engoPupil")
.directive("headTree", [ function () {
  return {
    restrict: "EA",
    template: "<div class='tree-btn' move-side><h2>All {{totUsers}}</h2></div>",

    link: function postLink(scope, element, attrs) {

    }
  };
}])
.directive("medTree", [ function () {
  return {
    restrict: "EA",
    template: "<div class='tree-btn' move-side><h4>{{medLevel.medTitle}} + {{medLevel.totEmps}}</h4></div>",

    link: function postLink(scope, element, attrs) {
      TweenMax.from(element, .5, {scaleY:0, opacity:0})
    }
  };
}])
.directive("lowTree", [ function () {
  return {
    restrict: "EA",
    template: "<div class='tree-btn' move-side><p>{{lowerLevel.lowTitle}} + {{lowerLevel.totEmps}}</p></div>",
    link: function postLink(scope, element, attrs) {
      TweenMax.from(element, .5, {delay:.3, scaleY:0, opacity:0})
    }
  };
}])


.directive("moveSide", [ function () {
  return {
    restrict: "EA",

    link: function postLink(scope, element, attrs) {

      element.currentTarget.bind("mouseover", function(){
         TweenMax.to(element.currentTarget, .3, {x:-10})
      });

      element.currentTarget.bind("mouseout", function(){
         TweenMax.to(element.currentTarget, .3, {x:0})
      });

    }
  };
}]);

