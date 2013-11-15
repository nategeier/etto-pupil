'use strict';



angular.module("engoPupil")
.directive("sessionHandle", [ "Session", function ( Session ) {

  console.log('form dir---------------', Session.isLogged)

  return {

    template: "",

    restrict: "E",


    link: function postLink(scope, element, attrs) {
    }

  };
}]);


