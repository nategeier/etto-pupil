"use strict";

angular.module("ettoPupil")
  .factory("CoursePlayer", [

    function () {
      var onBlock = 0;

      var course = {
        blocks: []
      };

      var play = function (newCourse) {
        course = newCourse;
        onBlock = 0;
      };

      var blocksInCourse = function () {
        return course.blocks.length;
      };

      var currentBlock = function () {
        return onBlock;
      };

      var onLastBlock = function () {
        return onBlock === blocksInCourse() - 1;
      };

      var isCurrentBlock = function (block) {
        return block === onBlock;
      };

      var prevBlock = function () {
        if (onBlock > 0) {
          onBlock--;
        }
      };

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
