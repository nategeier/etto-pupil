"use strict";

angular.module( "engoPupil" )
.directive( "engoModule", [ function () {
  return {

    templateUrl: "views/directives/engoModule.html",
    restrict: "E",
    controller: function ( $scope, $document, $attrs ) {
      $scope.editing = $attrs[ "edit" ] !== undefined;

      $scope.currentBlock = 0;

      if( $scope.module === undefined ) { $scope.module = {}; }
      if( $scope.module.blocks === undefined ) { $scope.module.blocks = []; }

      $scope.module.blocks = $scope.module.blocks.map( function( block, index ) {
        block.index = index;
        return block;
      });

      $scope.isCurrentBlock = function( index ) {
        return index === $scope.currentBlock;
      };

      $scope.nextBlock = function() {
        if( $scope.currentBlock < $scope.module.blocks.length - 1 ) {
          $scope.currentBlock++;
        }
      };

      $scope.prevBlock = function() {
        if( $scope.currentBlock > 0 ) {
          $scope.currentBlock--;
        }
      };

      $document.keydown(function (e) {
        var key = e.keyCode;

        if (key === 32 || key === 39) {
          $scope.nextBlock();
        } else if (key === 37) {
          $scope.prevBlock();
        }

        $scope.$apply();
      });

    },

    link: function postLink(scope, element, attrs) {
    }

  };
}]);

