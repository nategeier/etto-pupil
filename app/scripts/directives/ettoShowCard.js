"use strict";

angular.module("ettoPupil")
  .directive("ettoShowCard", [

    function () {
      return {
        template: "<h5>Card on file</h5>" +
          "<p ng-model='customer.active_card.type'></p>" +
          "<p ng-model='customer.active_card.last4'></p>",
        restrict: "E",
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);
