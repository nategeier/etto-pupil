"use strict";

angular.module( "engoPupil" )
.directive( "engoYoutube", [ "$sce", function( $sce ) {
  return {

    restrict: "E",
    scope: { code: "@" },
    template: "<div style='height:540px;'><iframe style='overflow:hidden;height:100%;width:100%' width='100%' height='100%' src='{{ ytUrl }}' frameborder='0' allowfullscreen></iframe></div>",
    link: function( scope, element, attrs ) {
      scope.ytUrl = $sce.trustAsResourceUrl( "http://www.youtube.com/embed/" + scope.code );
    }

  };
}]);

