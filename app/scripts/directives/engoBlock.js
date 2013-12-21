"use strict";

angular.module("engoPupil")
  .directive("engoBlock", ["$compile", "BlockType", "CoursePlayer",
    function ($compile, BlockType, CoursePlayer) {
      return {
        template: "<ng-include src='blockTemplate'></ng-include>",
        restrict: "E",
        controller: function ($scope, $element, $attrs) {
          // TODO: Not very DRY, call parent scope's isCurrentBlock from template?
          $scope.isCurrentBlock = function (block) {
            return CoursePlayer.isCurrentBlock(block);
          };

          $scope.saveModule = function () {
            $scope.$emit("module-save");
          };
        },
        link: function postLink($scope, $element, $attrs) {
          var editTemplate, editEl;

          // Set the blockTemplate based off $scope's block.type
          var pathBase = "/views/blocks/" + $.camelCase("engo-block-" + $scope.block.type);
          $scope.blockTemplate = pathBase + ".html";
          $scope.blockTemplateEdit = pathBase + "Edit.html";

          if ($scope.$parent.editing) {
            editTemplate = "<div class='engo-module-block-edit-container' ng-show='isCurrentBlock( block.index )'>" +
              "<ng-include src='blockTemplateEdit'></ng-include>" +
              "<button class='btn btn-primary' ng-click='saveModule()'>Save</button>" +
              "</div>";
            editEl = $compile(editTemplate)($scope);
            angular.element(".engo-toolbox").append(editEl);
          }
        }
      };
    }
  ]);
