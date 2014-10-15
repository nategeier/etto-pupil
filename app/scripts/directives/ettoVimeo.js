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

          var code = scope.vimeo;

          if (code.substring(0, 4) === "http") {
            var parts = code.split('.com/', 2);
            code = parts[1];
          }

          scope.vimeoUrl = $sce.trustAsResourceUrl("//player.vimeo.com/video/" + code);
        }

      };
    }
  ]);
