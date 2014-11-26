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
          $scope.onLastBlock = false;
          $scope.blockEvent = "next";

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
          }, {
            name: "download",
            humanized: "Download",
          }, {
            name: "map",
            humanized: "Map",
          }];

          $scope.newBlocktype = $scope.blocktypes[0];

          // Start the course!

          CoursePlayer.play($scope.course, 0);

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
            if (CoursePlayer.currentBlock() !== 0) {
              CoursePlayer.switchToBlock(CoursePlayer.currentBlock() - 1);
            }
            $scope.saveCourse();
          };

          $scope.swapBlocks = function (a, b) {
            var returnObj = CoursePlayer.swapBlocks(a, b);
            $scope.saveCourse();
            return returnObj;
          };

          $scope.saveCourse = function () {
            $scope.blockEvent = "none";
            $scope.$emit("course-save");
          };

          $scope.isCurrentBlock = function (block) {
            return CoursePlayer.isCurrentBlock(block);
          };

          $scope.lock = function () {
            CoursePlayer.lock();
          };

          $scope.unlock = function () {
            CoursePlayer.unlock();
          };

          $scope.checkLocked = function () {
            return CoursePlayer.isLocked();
          };

          $scope.nextBlock = function () {
            console.log("next again")
            $scope.blockEvent = "next";
            //--- No more slides so show options to create a new slide on next button click if in editiing
            if ($scope.editing) {
              //---- Editing free will
              if (CoursePlayer.currentBlock() === (CoursePlayer.blocksInCourse() - 1)) {
                //--- If no more blocks and they press right, show block template options
                $scope.showOptions();

              } else {
                $scope.onLastBlock = false;
                CoursePlayer.nextBlock();
                $scope.scrollTop();
              }

              $scope.onLastBlock = CoursePlayer.onLastBlock();
            } else if (!$scope.isDemo) {
              //----- View mode, update bookmark and check if locked

              if (CoursePlayer.isLocked() === false) {
                $scope.locked = false;
                CoursePlayer.nextBlock();
                var currBlock = Number(CoursePlayer.currentBlock()) + 1;

                Record.updateBookmark($scope.record._id, currBlock, CoursePlayer.blocksInCourse());
                $scope.scrollTop();
              }
            } else {
              //----- Demo mode, carry on
              CoursePlayer.nextBlock();
              $scope.scrollTop();
            }
          };

          $scope.prevBlock = function () {
            if (CoursePlayer.isLocked() === false) {
              $scope.blockEvent = "prev";
              CoursePlayer.prevBlock();
              $scope.scrollTop();
              $scope.onLastBlock = CoursePlayer.onLastBlock();
            }
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
