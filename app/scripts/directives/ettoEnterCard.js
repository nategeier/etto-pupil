"use strict";

angular.module("ettoPupil")
  .directive("ettoEnterCard", [

    function () {
      return {
        template: "<input type='text' ng-model='card.number' placeholder='card number' autocomplete='off'></input>" +
          "<input type='text' ng-model='card.exp_month' placeholder='exp_month' autocomplete='off'></input>" +
          "<input type='text' ng-model='card.exp_year' placeholder='exp_year' autocomplete='off'></input>" +
          "<input type='text' ng-model='card.cvc' placeholder='cvc' autocomplete='off'></input>",
        restrict: "E",
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);
