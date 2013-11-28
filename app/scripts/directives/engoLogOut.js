'use strict';

angular.module('engoPupil')
  .directive('logOut', ['$location', function (location) {

    return {
      template: '<div>Logout</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.bind('click', function(){
          location.path('/#/store');
           console.log('local')
        });
      }
    };
  }]);
