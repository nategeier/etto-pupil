"use strict";

angular.module("enrollgoComposerApp")
.directive("enrollgoModule", [function () {
  return {

    template: "<div class='enrollgo-module-prev-block' ng-click='prevBlock()'><i class='fa fa-2x fa-arrow-circle-left'></i></div>" +
              "<div class='container row'>" +
              "<enrollgo-block class='columns' ng-repeat='block in module.blocks' ng-show='isCurrentBlock()' block='block'></enrollgo-block>" +
              "</div>" +
              "<div class='enrollgo-module-next-block' ng-click='nextBlock()'><i class='fa fa-2x fa-arrow-circle-right'></i></div>",

    restrict: "E",

    controller: function ( $scope, $document ) {
      $scope.currentBlock = 0;

      $scope.module.blocks = $scope.module.blocks.map( function( block, index ) {
        block.index = index;
        return block;
      });

      $scope.nextBlock = function() {
        if( $scope.currentBlock < $scope.module.blocks.length - 1 ) {
          $scope.currentBlock++;
          $scope.$apply();
        }
      };
    
      $scope.prevBlock = function() {
        if( $scope.currentBlock > 0 ) {
          $scope.currentBlock--;
          $scope.$apply();
        }
      };

      $document.keydown(function (e) {
        var key = e.keyCode;

        if (key === 32 || key === 39) {
          $scope.nextBlock();
        } else if (key === 37) {
          $scope.prevBlock();
        }
      });

    },

    link: function postLink(scope, element, attrs) {
    }

  };
}]);

