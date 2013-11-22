"use strict";

angular.module( "engoPupil" )
.directive( "engoBlock", [ "$compile", "BlockType", function ( $compile, BlockType ) {
  return {

    template: "",
    restrict: "E",
    scope: {
      block: "="
    },
    controller: function( $scope, $element ) {

      // Get the BlockType, including template
      // TODO: is `query` the best way? or `get` with `isArray: true`? or...?
      BlockType.query({ type: $scope.block.type }, function( blocktype ) {
        var blockEl;

        if( blocktype.length ) {
          $scope.blocktype = blocktype[0];
        } else {
          $scope.blocktype = { template: "<div>This slide is missing a template!</div>" };
        }

        // Compile the loaded template and bind it to this Block's scope
        blockEl = $compile( $scope.blocktype.template )( $scope );
        $element.append( blockEl );
      });

    },


    link: function postLink(scope, element, attrs) {
    }

  };
}]);

