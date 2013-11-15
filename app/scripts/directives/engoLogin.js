'use strict';

angular.module('engoPupil')
  .directive('engoLogin', function () {
    console.log();
    var subBtn = angular.element('<input value="Login" class="button small right"/>');

    return {

      restrict: 'E',
      template: '<input type="text" ng-model="user.email" placeholder="Email" autocomplete="on" />' +
        '<input type="password" ng-model="user.password" placeholder="Password" autocapitalize="off" />',
      compile: function(tElem){
        tElem.append(subBtn);
        return function (scope, element, attrs) {
          subBtn.bind('click', function(){
            scope.$apply('submitLogin("/api/v1/sessions/start_session")')
          })
        }
      }
    };
  });
