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
        var KEY_ENTER = 13, KEY_RIGHT = 39, KEY_LEFT = 37;
        var key = e.keyCode;

        if( !$scope.editing ) {
          if( key === KEY_ENTER || key === KEY_RIGHT ) {
            $scope.nextBlock();
          } else if ( key === KEY_LEFT ) {
            $scope.prevBlock();
          }

          $scope.$apply();
        }
      });

    },

    link: function postLink(scope, element, attrs) {
    }

  };
}]);

