"use strict";

angular.module("ettoPupil")
  .directive("ettoStorePurchase", [

    function () {
      return {
        template: "<div></div>",
        restrict: "E",
        link: function postLink(scope, element, attrs) {
          element.text("this is the ettoStorePurchase directive");
        }
      };
    }
  ]);
