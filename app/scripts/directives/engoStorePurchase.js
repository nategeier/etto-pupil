"use strict";

angular.module("engoPupil")
  .directive("engoStorePurchase", [

    function () {
      return {
        template: "<div></div>",
        restrict: "E",
        link: function postLink(scope, element, attrs) {
          element.text("this is the engoStorePurchase directive");
        }
      };
    }
  ]);
