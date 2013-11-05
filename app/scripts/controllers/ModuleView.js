"use strict";

angular.module( "enrollgoComposerApp" )
.controller( "ModuleViewCtrl", [ "$scope", "$compile", "module", function ( $scope, $compile, module ) {
  $scope.module = module;
}]);

