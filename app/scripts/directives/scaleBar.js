'use strict';

angular.module('engoPupil')
  .directive('scaleBar', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the scaleBar directive');
        TweenMax.fromTo(element, 1, {scaleY:0}, {delay:1, scaleY:1});
      }
    };
  });
