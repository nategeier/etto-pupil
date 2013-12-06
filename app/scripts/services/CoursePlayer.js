"use strict";

angular.module( "engoPupil" )
.factory( "CoursePlayer", [ function() {
  var onBlock = 0;
  
  var course = { blocks: [ {} ] };

  var blocksInCourse = function() {
    return course.blocks.length;
  };

  var onLastBlock = function() {
    return onBlock === blocksInCourse() - 1;
  };

  var prevBlock = function() {
    if( onBlock > 0 ) {
      onBlock--;
    }
  };

  var nextBlock = function() {
    if( !onLastBlock() ) {
      onBlock++;
    }
  };

  var CoursePlayer = {
    play: function( newCourse ) { course = newCourse; },
    blocksInCourse: blocksInCourse,
    currentBlock: function() {
      return onBlock;
    },
    onLastBlock: onLastBlock,
    isCurrentBlock: function( block ) {
      return block === onBlock;
    },
    prevBlock: prevBlock,
    nextBlock: nextBlock
  };

  return CoursePlayer;
}]);
