"use strict";

angular.module("enrollgoComposerApp")
.directive("enrollgoBlock", [ "$compile", "BlockType", function ( $compile, BlockType ) {
  return {

    template: "",

    restrict: "E",

    controller: function( $scope, $element, $attrs ) {
      // Snag BlockType
      BlockType.query({ type: $scope.block.type }, function( blocktype ) {
        var blockEl;

        if( blocktype.length ) {
          $scope.blocktype = blocktype[0];
        } else {
          $scope.blocktype = {};
          $scope.blocktype.template = "<div>This slide is missing a template!</div>";
        }

        blockEl = $compile( $scope.blocktype.template )( $scope );
        $element.append( blockEl );
      });

      $scope.isCurrentBlock = function() {
        return $scope.block.index === $scope.$parent.currentBlock;
      };

      $scope.show = function() {
        this.show();
      };
    },

    scope: {
      block: "="
    },

    link: function postLink(scope, element, attrs) {
      //element.hide();
    }

  };
}]);
