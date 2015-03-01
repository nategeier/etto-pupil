"use strict";

angular.module("ettoPupil")
  .directive("ettoCode", ["$compile",
    function ($compile) {
      return {

        restrict: "E",

        link: function (scope, element, attrs) {

          element.html(attrs.code);

          $compile(element.contents())(scope);
        }

      };
    }
  ]);
