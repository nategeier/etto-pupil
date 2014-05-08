"use strict";

angular.module("ettoPupil")
  .directive("ettoCourse", ["CoursePlayer", "Record",
    function (CoursePlayer, Record) {
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
            name: "three-up",
            humanized: "Three Up",
          }, {
            name: "quote",
            humanized: "Quote",
          }, {
            name: "video",
            humanized: "Video",
          }, {
            name: "image",
            humanized: "Image",
          }, {
            name: "quiz",
            humanized: "Quiz",
          }, {
            name: "three-images",
            humanized: "Images",
          }, {
            name: "four-images",
            humanized: "Images",
          }, {
            name: "define",
            humanized: "Define",
          }];

          $scope.newBlocktype = $scope.blocktypes[0];

          // Start the course!

          CoursePlayer.play($scope.course);

          //--- Sets last frome "you win! to user"
          if (!$scope.editing) {
            $scope.course.blocks.push({
              type: "finished",
              data: {
                title: "all done"
              }
            });
          }

          // Controller Methods
          $scope.currentBlock = function () {
            return CoursePlayer.currentBlock();
          };

          $scope.blocksInCourse = function () {
            return CoursePlayer.blocksInCourse();
          };

          $scope.addBlock = function (blocktype) {
            var newBlockId = CoursePlayer.addBlock(blocktype, CoursePlayer.currentBlock() + 1);
            CoursePlayer.switchToBlock(newBlockId);
          };

          $scope.removeBlock = function (index) {
            CoursePlayer.removeBlock(CoursePlayer.currentBlock());
            $scope.saveCourse();
          };

          $scope.swapBlocks = function (a, b) {
            return CoursePlayer.swapBlocks(a, b);
          };

          $scope.saveCourse = function () {
            $scope.$emit("course-save");
          };

          $scope.isCurrentBlock = function (block) {
            return CoursePlayer.isCurrentBlock(block);
          };

          $scope.nextBlock = function () {

            CoursePlayer.nextBlock();
            if (!$scope.editing && !$scope.isDemo) {
              var currBlock = Number(CoursePlayer.currentBlock()) + 1;
              Record.updateBookmark($scope.record._id, currBlock, CoursePlayer.blocksInCourse());
            }
            $scope.scrollTop();
          };

          $scope.prevBlock = function () {
            CoursePlayer.prevBlock();
            $scope.scrollTop();
          };

          $scope.scrollTop = function () {
            $("html,body").scrollTop(0);
          };

          // Setup handlers for alternative input methods
          $document.keydown(function (e) {
            var KEY_RIGHT = 39,
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
