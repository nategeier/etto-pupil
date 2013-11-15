"use strict";

angular.module( "engoPupil" )
.controller( "ModuleViewCtrl", [ "$scope", "$compile", "module", function ( $scope, $compile, module ) {
  $scope.module = module;
}]);

