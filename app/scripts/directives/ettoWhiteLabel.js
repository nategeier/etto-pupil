"use strict";

angular.module("ettoPupil")
  .directive("ettoWhiteLabel", ["WhiteLabel",

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, WhiteLabel) {

          WhiteLabel.giveColors();

        },
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);
