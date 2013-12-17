'use strict';

angular.module('engoPupil')
  .directive('engoNewBrand', [

    function () {
      // var subBtn = angular.element('<input type="submit" value="Login" class="btn btn-primary right"/><div class="clear"></div></form>');

      return {

        restrict: 'E',
        templateUrl: 'views/directives/engoNewBrand.html',
        link: function postLink(scope, element, attrs) {
          TweenMax.from(element, 1, {
            scaleY: 0,
            opacity: 0
          });
        }
      };
    }
  ]);
