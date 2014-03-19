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
            $scope.$emit("course-save");
          };
        },
        link: function postLink($scope, $element, $attrs) {
          var editTemplate, editEl;

          // Set the blockTemplate based off $scope's block.type
          var pathBase = "/views/blocks/" + $.camelCase("etto-block-" + $scope.block.type);
          $scope.blockTemplate = pathBase + ".html";
          $scope.blockTemplateEdit = pathBase + "Edit.html";

          if ($scope.$parent.editing) {
            editTemplate = "<div class='etto-course-block-edit-container' ng-show='isCurrentBlock( $index )'></div>";
            editEl = $compile(editTemplate)($scope);
            angular.element(".etto-toolbox-blocktools").append(editEl);
          }
        }
      };
    }
  ]);
