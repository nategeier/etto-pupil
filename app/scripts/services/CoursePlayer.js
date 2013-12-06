"use strict";

angular.module( "engoPupil" )
.service( "CoursePlayer", [ function() {
  this.onBlock = 0;
  
  this.course = { blocks: [ {} ] };

  this.blocksInCourse = function() {
    return this.course.blocks.length;
  };

  this.onLastBlock = function() {
    return this.onBlock === this.blocksInCourse() - 1;
  };

  this.prevBlock = function() {
    if( this.onBlock > 0 ) {
      this.onBlock--;
    }
  };

  this.nextBlock = function() {
    if( !this.onLastBlock() ) {
      this.onBlock++;
    }
  };

  this.currentBlock = function() {
    return this.onBlock;
  };

  this.play = function( newCourse ) {
    this.course = newCourse;
  };

  this.isCurrentBlock = function( block ) {
    return block === this.onBlock;
  };

}]);
