"use strict";

angular.module("ettoPupil")
  .directive("ettoImage", ["$sce",
    function ($sce) {
      return {
        restrict: "E",
        scope: {
          url: "@"
        },
        template: "<img src='{{ trustedUrl }}' class='img-responsive'>",
        link: function (scope, element, attrs) {
          scope.trustedUrl = $sce.trustAsResourceUrl(scope.url);
        }
      };
    }
  ]);
