"use strict";

angular.module("ettoPupil")
  .directive("ettoSound", [

    function () {
      return {
        templateUrl: "/views/course/ettoSound.html",
        restrict: "EA",

        controller: function ($scope, $attrs) {

          SC.initialize({
            client_id: "ad9b59b912df13003f2d80c851163490"
          });

          var auto_play = true;

          if ($scope.editing && $scope.editing === true) {
            auto_play = false;
          }

          if ($scope.block.data && $scope.block.data.soundurl) {
            var track_url = $scope.block.data.soundurl;

            SC.oEmbed(track_url, {
              auto_play: auto_play,
              maxheight: 120,
              color: "fff334"
            }, function (oEmbed) {
              $("#etto-blocksound").append(oEmbed.html)
            });
          }
        },
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);
