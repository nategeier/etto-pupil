"use strict";

angular.module( "engoPupil" )
.directive( "engoModule", [ function () {
  return {

    template: "<div class='container row'>" +
              "<engo-block ng-repeat='block in module.blocks' ng-show='isCurrentBlock()' block='block'></engo-block>" +
              "</div>" +
              "<div class='engo-module-prev-block' ng-click='prevBlock()'><i class='fa fa-2x fa-arrow-circle-left'></i></div>" +
              "<div class='engo-module-next-block' ng-click='nextBlock()'><i class='fa fa-2x fa-arrow-circle-right'></i></div>",

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

