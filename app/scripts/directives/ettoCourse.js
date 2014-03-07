"use strict";

angular.module("ettoPupil")
  .directive("ettoCourse", ["CoursePlayer",
    function (CoursePlayer) {
      return {
        templateUrl: "/views/directives/ettoCourse.html",
        restrict: "E",
        controller: function ($scope, $document, $attrs) {
          // Are we in edit mode?
          $scope.editing = $attrs.edit !== undefined;

          // Setup blocktype info
          // TODO: Should be refactored somewhere else. Service?
          $scope.blocktypes = [{
            name: "title",
            humanized: "Title",
          }, {
            name: "text-and-image",
            humanized: "Text And Image",
          }, {
            name: "three-up",
            humanized: "Three Up",
          }, {
            name: "quote",
            humanized: "Quote",
          }, {
            name: "youtube",
            humanized: "You Tube",
          }, {
            name: "image",
            humanized: "Image",
          }];
          $scope.newBlocktype = $scope.blocktypes[0];

          // Start the course!
          CoursePlayer.play($scope.course);

          // Controller Methods
          $scope.addBlock = function (blocktype) {
            var newBlockId = CoursePlayer.addBlock(blocktype, CoursePlayer.currentBlock() + 1);
            CoursePlayer.switchToBlock(newBlockId);
          };

          $scope.removeBlock = function (index) {
            CoursePlayer.removeBlock(CoursePlayer.currentBlock());
          };

          $scope.saveCourse = function () {
            $scope.$emit("course-save");
          };

          $scope.isCurrentBlock = function (block) {
            return CoursePlayer.isCurrentBlock(block);
          };

          $scope.nextBlock = function () {
            CoursePlayer.nextBlock();
          };

          $scope.prevBlock = function () {
            CoursePlayer.prevBlock();
          };

          // Setup handlers for alternative input methods
          $document.keydown(function (e) {
            var KEY_ENTER = 13,
              KEY_RIGHT = 39,
              KEY_LEFT = 37;
            var key = e.keyCode;

            if (!$scope.editing) {
              if (key === KEY_RIGHT) {
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
