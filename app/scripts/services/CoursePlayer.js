"use strict";

angular.module( "engoPupil" )
.factory( "CoursePlayer", [ function() {
  var currentBlock = 0;
  
  var course = { blocks: [ {} ] };

  var CoursePlayer = {
    play: function( newCourse ) { course = newCourse; },
    blocksInCourse: function() { return course.blocks.length; },
    currentBlock: function() {
      return currentBlock;
    },
    isCurrentBlock: function( block ) {
      return block === currentBlock;
    },
    onLastBlock: function() { return this.currentBlock() === this.blocksInCourse() - 1; },
    prevBlock: function() {
      if( currentBlock > 0 ) {
        currentBlock--;
      }
    },
    nextBlock: function() {
      if( !this.onLastBlock() ) {
        currentBlock++;
      }
    }
  };

  return CoursePlayer;
}]);
