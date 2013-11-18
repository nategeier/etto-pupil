'use strict';

angular.module('engoPupil')
  .directive('scaleBar', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the scaleBar directive');
        TweenMax.from(element, 1, {scaleY:0, opacity:0});
      }
    };
  });
