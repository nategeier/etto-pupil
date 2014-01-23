"use strict";

angular.module("ettoPupil")
  .directive("ettoCourse", ["CoursePlayer",
    function (CoursePlayer) {
      return {
        templateUrl: "/views/directives/ettoCourse.html",
        restrict: "E",
        controller: function ($scope, $document, $attrs) {
          $scope.editing = $attrs.edit !== undefined;

          $scope.addBlock = function (blocktype) {
            // Convert humanized string to dashed
            if (blocktype) {
              // Trim
              blocktype = blocktype.replace(/^\s+|\s+$/gm, "");
              // Dasherize
              blocktype = blocktype.replace(/\s+/g, "-");
              blocktype = blocktype.toLowerCase();
            }
            return CoursePlayer.addBlock(blocktype);
          };

          CoursePlayer.play($scope.course);

          $scope.isCurrentBlock = function (block) {
            return CoursePlayer.isCurrentBlock(block);
          };

          $scope.nextBlock = function () {
            CoursePlayer.nextBlock();
          };

          $scope.prevBlock = function () {
            CoursePlayer.prevBlock();
          };

          $document.keydown(function (e) {
            var KEY_ENTER = 13,
              KEY_RIGHT = 39,
              KEY_LEFT = 37;
            var key = e.keyCode;

            if (!$scope.editing) {
              if (key === KEY_ENTER || key === KEY_RIGHT) {
                $scope.nextBlock();
              } else if (key === KEY_LEFT) {
                $scope.prevBlock();
              }

              $scope.$apply();
            }
          });
        },

        link: function postLink(scope, element, attrs) {}

      };
    }
  ]);
