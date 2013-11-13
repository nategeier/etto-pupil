"use strict";

angular.module( "enrollgoComposerApp" )
.controller( "ModuleEditCtrl", [ "$scope", "module", function ( $scope, module ) {
  $scope.module = module;
}]);
