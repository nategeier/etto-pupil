'use strict';

angular.module('engoPupil')
  .directive('engoNotLoggedInNav', [function () {
    console.log('roller')
    return {
      template: '<div class="row">' +
      '<div class="large-6 columns small-6">' +
        '<div class="logo">' +
          '<h2>EnrollGo</h2>' +
        '</div>' +
      '</div>' +
      '<nav>' +
        '<ul>' +
          '<li><a href="/#/login/new">Login</a></li>' +
        '</ul>' +
      '</nav>' +
    '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  }]);
