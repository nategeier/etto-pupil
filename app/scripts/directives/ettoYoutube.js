"use strict";

angular.module("ettoPupil")
  .directive("ettoYoutube", ["$sce",
    function ($sce) {
      return {

        restrict: "E",
        scope: {
          code: "@"
        },
        template: "<div class='video-container'><iframe width='100%' height='100%' src='{{ ytUrl }}' frameborder='0' allowfullscreen></iframe></div>",
        link: function (scope, element, attrs) {
          scope.ytUrl = $sce.trustAsResourceUrl("//www.youtube.com/embed/" + scope.code);
        }

      };
    }
  ]);
