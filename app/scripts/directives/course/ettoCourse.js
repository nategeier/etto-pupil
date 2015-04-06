"use strict";

angular.module("ettoPupil")
  .directive("ettoCourse", ["CoursePlayer", "Record",
    function (CoursePlayer, Record) {
      return {
        templateUrl: "/views/directives/ettoCourse.html",
        restrict: "E",
        controller: function ($scope, $document, $attrs, $state, $stateParams) {
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
            humanized: "Just Text",
          }, {
            name: "quote",
            humanized: "Quote",
          }, {
            name: "video",
            humanized: "Add Video",
          }, {
            name: "image",
            humanized: "Text + Image",
          }, {
            name: "quiz",
            humanized: "Quiz",
          }, {
            name: "three-images",
            humanized: "3 Images + Text",
          }, {
            name: "four-images",
            humanized: "4 Images + Text",
          }, {
            name: "define",
            humanized: "Define a Word",
          }, {
            name: "download",
            humanized: "Downloadables",
          }, {
            name: "map",
            humanized: "Map",
          }, {
            name: "code",
            humanized: "Display Code",
          }];

          $scope.newBlocktype = $scope.blocktypes[0];

          // Start the course!
          var startingBlock = 0;
          if ($stateParams.blockId) {
            startingBlock = Number($stateParams.blockId) - 1;
          }

          CoursePlayer.play($scope.course, startingBlock);

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

          //.etto-title-image(ng-style="{{"webkit-filter": blur(block.data.blur || 0px); url(insertUrl());}}")

          $scope.setTitleImage = function (imageUrl, blur) {

            if (!imageUrl) {
              imageUrl = "/images/courses/default/title.jpg";
            }

            if (!blur) {
              blur = 0;
            }

            var url = "url('" + imageUrl + "')";
            var blur = "blur(" + blur + "px)";

            $scope.titleImage = {
              "background-image": url,
              "webkit-filter": blur,
              "filter": blur
            };
          };

          $scope.nextBlock = function () {
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

                $scope.changeUrl();
              }

              $scope.onLastBlock = CoursePlayer.onLastBlock();
            } else if (!$scope.isDemo) {

              //----- View mode, update bookmark and check if locked

              if (CoursePlayer.isLocked() === false) {
                $scope.locked = false;
                CoursePlayer.nextBlock();
                var currBlock = Number(CoursePlayer.currentBlock() + 1);

                $scope.record.progress.bookmark = currBlock;
                $scope.record.progress.totalBlocks = CoursePlayer.blocksInCourse();

                //--- Set the course as completed
                if (CoursePlayer.currentBlock() === (CoursePlayer.blocksInCourse() - 1) && !$scope.record.completed) {
                  $scope.record.completed = Date.now();
                }
                Record.updateBookmark($scope.record);
                $scope.changeUrl();

              }
            } else {
              //----- Demo mode, carry on
              CoursePlayer.nextBlock();
              $scope.changeUrl();
            }
          };

          $scope.updateRecord = function () {
            Record.updateBookmark($scope.record);
          };

          $scope.prevBlock = function () {
            if (CoursePlayer.isLocked() === false) {
              $scope.blockEvent = "prev";
              CoursePlayer.prevBlock();
              $scope.changeUrl();
              $scope.onLastBlock = CoursePlayer.onLastBlock();
            }
          };

          $scope.changeUrl = function () {

            $state.transitionTo($state.current, {
              courseId: $scope.course._id,
              blockId: Number(CoursePlayer.currentBlock() + 1)
            }, {
              reload: true,
              inherit: false,
              notify: false
            });
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
