'use strict';

angular.module('enrollgoComposerApp')
  .directive('logOut', ['$location', function (location) {

    return {
      template: '<div>Logout</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.bind('click', function(){
          console.log('click')
          location.path('/#/store');
           console.log('local')
        });
      }
    };
  }]);
