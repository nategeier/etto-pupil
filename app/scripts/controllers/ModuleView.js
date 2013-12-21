"use strict";

angular.module("ettoPupil")
  .controller("ModuleViewCtrl", ["$scope", "$compile", "module",
    function ($scope, $compile, module) {
      $scope.module = module;
    }
  ]);
