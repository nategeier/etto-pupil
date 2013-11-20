'use strict';

angular.module('engoPupil')
  .directive('engoDelegateTo', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',

      link: function postLink(scope, element, attrs) {
        element.bind('click', function(){
          console.log(' attrs', attrs.brandID)
          //scope.delegated = 
        })
      }
    };
  });
