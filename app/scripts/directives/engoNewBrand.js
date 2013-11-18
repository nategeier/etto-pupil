'use strict';

angular.module('engoPupil')
  .directive('engoNewBrand', [function () {
    var subBtn = angular.element('<input value="Login" class="button small right"/></form>');

    return {

      restrict: 'E',
      template: '<form ng-submit="update(user)" class="ng-scope ng-pristine ng-invalid ng-invalid-required">' +
        '<input type="text" ng-model="user.levelTitle" required="" placeholder= "Company or Username" class="ng-pristine ng-invalid ng-invalid-required" />' +
        '<input type="text" ng-model="user.name" required="" placeholder="First and Last Name" class="ng-pristine ng-invalid ng-invalid-required" />' +
        '<div class="err ng-binding"></div>' +
        '<input type="email" ng-model="user.email" required="" placeholder="Email" class="ng-pristine ng-invalid ng-invalid-required ng-valid-email" />' +
        '<input type="password" ng-model="user.password" required="" placeholder="Password" class="ng-pristine ng-invalid ng-invalid-required" />',
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
