"use strict";

/**
 * CoursePlayer Service
 * ============================================================================
 *
 * Creates AngularJS service "CoursePlayer".
 *
 */

angular.module("ettoPupil")
  .factory("CoursePlayer", [

    function () {
      var onBlock = 0;

      var course = {
        blocks: []
      };

      /**
       * Starts a new course.
       *
       * @param {course} newCourse The new course object to start playing.
       */
      var play = function (newCourse) {
        course = newCourse;
        onBlock = 0;
      };

      /**
       * Returns the number of blocks in the active course.
       *
       * @return {Number}
       */
      var blocksInCourse = function () {
        return course.blocks.length;
      };

      /**
       * Returns the index of the current block in the active course.
       *
       * @return {Number}
       */
      var currentBlock = function () {
        return onBlock;
      };

      /**
       * Returns true if the current block is the last block in the current course.
       *
       * @return {Boolean}
       */
      var onLastBlock = function () {
        return onBlock === blocksInCourse() - 1;
      };

      /**
       * Returns true if the passed block index is the current block in the active course.
       *
       * @param {block} The index to check against.
       * @return {Boolean}
       */
      var isCurrentBlock = function (block) {
        return block === onBlock;
      };

      /**
       * Switch to the previous block in the active course.
       */
      var prevBlock = function () {
        if (onBlock > 0) {
          onBlock--;
        }
      };

      /**
       * Switch to the next block in the active course.
       */
      var nextBlock = function () {
        if (!onLastBlock()) {
          onBlock++;
        }
      };

      var CoursePlayer = {
        play: play,
        blocksInCourse: blocksInCourse,
        currentBlock: currentBlock,
        onLastBlock: onLastBlock,
        isCurrentBlock: isCurrentBlock,
        prevBlock: prevBlock,
        nextBlock: nextBlock
      };

      return CoursePlayer;
    }
  ]);
