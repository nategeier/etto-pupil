'use strict';

angular.module('engoPupil')
  .directive('engoLoggedInNav', [function () {
    return {
      template: '<div class="row">' +
      '<div class="large-6 columns small-6">' +
        '<div class="logo">' +
          '<h2>EnrollGo</h2>' +
        '</div>' +
      '</div>' +
      '<nav>' +
        '<ul>' +
          '<li><a href="/#/engo">Home</a></li>' +
          '<li><a href="/#/store">Store</a></li>' +
          '<li><a href="/#/levels/0/0">Reports</a></li>' +
         ' <li><a href="/#/session/destroy">Logout</a></li>' +
        '</ul>' +
      '</nav>' +
    '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  }]);
