"use strict";

angular.module("enrollgoComposerApp")
.directive("enrollgoModule", [function () {
  return {

    template: "<div class='enrollgo-module-prev-block' ng-click='prevBlock()'><i class='fa fa-arrow-circle-left'></i></div>" +
              "<enrollgo-block ng-repeat='block in blocks' ng-show='isCurrentBlock()' index='block.index' content='block.content'></enrollgo-block>" +
              "<div class='enrollgo-module-next-block' ng-click='nextBlock()'><i class='fa fa-arrow-circle-right'></i></div>",

    restrict: "E",

    controller: function ( $scope ) {
      $scope.currentBlock = 0;

      $scope.blocks = $scope.module.data.map( function( block, index ) {
        return { "index": index, "content": block.data.text };
      });

      $scope.nextBlock = function() {
        if( $scope.currentBlock < $scope.blocks.length - 1 ) {
          $scope.currentBlock++;
        }
      };
    
      $scope.prevBlock = function() {
        if( $scope.currentBlock > 0 ) {
          $scope.currentBlock--;
        }
      };

    },

    link: function postLink(scope, element, attrs) {
    }

  };
}]);

