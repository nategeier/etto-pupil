'use strict';

angular.module('engoPupil')
  .directive('engoNewBrand', [function () {
    var subBtn = angular.element('<input type="submit" value="Login" class="btn btn-default right"/><div class="clear"></div></form>');

    return {

      restrict: 'E',
      templateUrl: 'views/directives/engoNewBrand.html',
      compile: function(tElem){
        tElem.append(subBtn);
        return function (scope, element, attrs) {
          subBtn.bind('click', function(){
            scope.$apply('submitLogin("/api/v1/sessions/create_brand")')
          })
        }
      }
    };
  }]);
