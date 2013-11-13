"use strict";

angular.module( "engoPupil" )
.controller( "ModuleEditCtrl", [ "$scope", "module", function ( $scope, module ) {
  $scope.module = module;
}]);
