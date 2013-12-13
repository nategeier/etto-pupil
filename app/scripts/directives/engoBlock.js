"use strict";

angular.module( "engoPupil" )
.directive( "engoBlock", [ "$compile", "BlockType", "CoursePlayer", function ( $compile, BlockType, CoursePlayer ) {
  return {

    template: "",
    restrict: "E",
    scope: {
      block: "="
    },
    controller: function( $scope, $element, $attrs ) {
      // TODO: Not very DRY, call parent scope's isCurrentBlock from template?
      $scope.isCurrentBlock = function( block ) { return CoursePlayer.isCurrentBlock( block ); };

      // Get the BlockType, including template
      // TODO: is `query` the best way? or `get` with `isArray: true`? or...?
      BlockType.query({ type: $scope.block.type }, function( blocktype ) {
        var blockEl, editEl;

        if( blocktype.length ) {
          $scope.blocktype = blocktype[0];
        } else {
          $scope.blocktype = {
            template: "<div>This slide is missing a template!</div>",
            editorTemplate: ""
          };
        }

        // Compile the loaded template and bind it to this Block's scope
        blockEl = $compile( $scope.blocktype.template )( $scope );
        $element.append( blockEl );

        if( $scope.$parent.editing ) {
          editEl = $compile( "<div class='engo-module-block-edit-container' ng-show='isCurrentBlock( block.index )'>" +
                             "<h3 ng-bind='blocktype.humanizedType'>Block Type</h3>" +
                             $scope.blocktype.editorTemplate +
                             "<button class='btn btn-primary' ng-click='saveModule()'>Save</button>" +
                             "</div>" )( $scope );
          angular.element( ".engo-toolbox" ).append( editEl );
        }
      });

      $scope.saveModule = function() {
        $scope.$emit( "module-save" );
      };

    },

    link: function postLink( scope, element, attrs ) {
    }

  };
}]);

