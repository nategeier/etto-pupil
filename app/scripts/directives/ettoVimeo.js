"use strict";

angular.module("ettoPupil")
  .directive("ettoVimeo", ["$sce",
    function ($sce) {
      return {

        restrict: "E",
        scope: {
          vimeo: "@"
        },
        template: "<div class='video-container'><iframe width='100%' height='100%' src='{{ vimeoUrl }}' frameborder='0' allowfullscreen></iframe></div>",
        link: function (scope, element, attrs) {
          scope.vimeoUrl = $sce.trustAsResourceUrl("//player.vimeo.com/video/" + scope.vimeo);
        }

      };
    }
  ]);
