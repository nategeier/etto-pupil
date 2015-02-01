"use strict";

angular.module("ettoPupil")
  .directive("ettoWistia", ["$sce",
    function ($sce) {
      return {

        restrict: "E",
        scope: {
          wistia: "@"
        },
        template: "<div class='video-container'><iframe src='{{ wistiaUrl }}' allowtransparency='true' frameborder='0' scrolling='no' class='wistia_embed' name='wistia_embed' allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width = '640' height = '360'></iframe><script src='//fast.wistia.net/assets/external/E-v1.js' async></script></div>",
        link: function (scope, element, attrs) {

          var code = attrs.wistia;

          if (code.substring(0, 4) === "https") {
            var parts = code.split(".com/", 2);
            code = parts[1];
          }

          console.log("hello", code)
          scope.wistiaUrl = $sce.trustAsResourceUrl("//fast.wistia.net/embed/iframe/" + code);
        }

      };
    }
  ]);
