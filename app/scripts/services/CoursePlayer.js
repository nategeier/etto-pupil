"use strict";

/**
 * CoursePlayer Service
 * ============================================================================
 *
 * Creates AngularJS service "CoursePlayer".
 *
 */

angular.module("ettoPupil")
  .factory("CoursePlayer", ["BlockQuiz", "Record",

    function (BlockQuiz, Record) {
      var onBlock = 0;
      var locked = false;
      var course = {
        blocks: []
      };

      /**
       * Starts a new course.
       *
       * @param {course} newCourse The new course object to start playing.
       */
      var play = function (newCourse, playBlock) {

        course = newCourse;
        console.log(playBlock);
        onBlock = playBlock;
      };

      var unlock = function () {
        locked = false;
      };

      var lock = function () {
        locked = true;
      };

      var isLocked = function () {
        return locked;
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

      /**
       * Switch to the next block in the active course.
       */
      var switchToBlock = function (block) {
        if (blocksInCourse() > block) {
          onBlock = block;
        } else {
          // Block doesn't exist!
          return -1;
        }
      };

      /**
       * Add a new block to the end of the course or, if provided, the index
       */
      var addBlock = function (blocktype, index) {

        var newBlock = {
          type: blocktype,
          data: {},
        };

        switch (blocktype) {
        case "quiz":

          newBlock.data.questions = [BlockQuiz.getQuestion()];
          break;

        default:

        }

        if (index !== undefined) {
          course.blocks.splice(index, 0, newBlock);
          return index;
        } else {
          return course.blocks.push(newBlock) - 1; // One less!
        }
      };

      /**
       * Remove the block at the passed index and return how many are left
       */
      var removeBlock = function (index) {
        course.blocks.splice(index, 1);
        return blocksInCourse();
      };

      /**
       * Swap two blocks
       */
      var swapBlocks = function (a, b) {
        if (a < 0 || b < 0 ||
          a > blocksInCourse() - 1 || b > blocksInCourse() - 1) {
          return false;
        }

        var tmp = course.blocks[a];
        course.blocks[a] = course.blocks[b];
        course.blocks[b] = tmp;

        return true;
      };

      var CoursePlayer = {
        play: play,
        isLocked: isLocked,
        unlock: unlock,
        lock: lock,
        blocksInCourse: blocksInCourse,
        currentBlock: currentBlock,
        onLastBlock: onLastBlock,
        isCurrentBlock: isCurrentBlock,
        prevBlock: prevBlock,
        nextBlock: nextBlock,
        switchToBlock: switchToBlock,
        addBlock: addBlock,
        removeBlock: removeBlock,
        swapBlocks: swapBlocks
      };

      return CoursePlayer;
    }
  ]);
