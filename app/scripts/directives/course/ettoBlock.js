"use strict";

angular.module("ettoPupil")
  .directive("ettoBlock", ["$compile", "BlockType", "CoursePlayer",
    function ($compile, BlockType, CoursePlayer) {
      return {
        template: "<ng-include src='blockTemplate'></ng-include>",
        restrict: "E",
        controller: function ($scope, $element, $attrs) {
          // TODO: Not very DRY, call parent scope's isCurrentBlock from template?
          $scope.isCurrentBlock = function (block) {
            return CoursePlayer.isCurrentBlock(block);
          };

          $scope.saveCourse = function () {
            $scope.blockEvent = "none";
            $scope.$emit("course-save");
          };

        },
        link: function postLink($scope, $element, $attrs) {
          var editTemplate = null;
          var editEl = null;

          //---- Transition block
          if ($scope.blockEvent !== "none") {
            var transBlock = 400;

            if ($scope.blockEvent === "prev") {
              transBlock = -(transBlock);
            }
            if (!$scope.editing) {
              TweenMax.from($element, 0.6, {
                x: transBlock,
                scaleX: 0.8,
                opacity: 0
              });
            }

          }

          // Set the blockTemplate based off $scope's block.type
          var pathBase = "/views/blocks/" + $.camelCase("etto-block-" + $scope.block.type);
          $scope.blockTemplate = pathBase + ".html";
          $scope.blockTemplateEdit = pathBase + "Edit.html";

          if ($scope.$parent.editing) {
            $scope.blockTemplate = pathBase + "Edit.html";
            editTemplate = "<div class='etto-course-block-edit-container' ng-if='isCurrentBlock( $index )'></div>";
            editEl = $compile(editTemplate)($scope);
            angular.element(".etto-toolbox-blocktools").append(editEl);
          }
        }
      };
    }
  ]);
