

'use strict';

var app = angular.module('engoPupil');


app.directive('moveSide', function () {
  return {
    restrict: 'EA',

    link: function postLink(scope, element, attrs) {

      element.bind('mouseover', function(){
         TweenMax.to(element, .3, {x:-10})
      });

      element.bind('mouseout', function(){
         TweenMax.to(element, .3, {x:0})
      });

    }
  };
});


app.directive('sinkIn', function () {
  return {
    restrict: 'EA',

    link: function postLink(scope, element, attrs) {

      element.bind('mouseover', function(){
         TweenMax.to(element, .3, {scaleX:.95, scaleY:.95, backgroundColor:'#b2fff9'})
      });

      element.bind('mouseout', function(){
         TweenMax.to(element, .3, {scaleX:1, scaleY:1, backgroundColor:'none'})
      });

    }
  };
});
