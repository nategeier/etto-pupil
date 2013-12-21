"use strict";

angular.module("ettoPupil")
  .controller("ModuleEditCtrl", ["$scope", "module",
    function ($scope, module) {
      $scope.module = module;

      $scope.$on("module-save", function () {
        // TODO: Validate module before update
        $scope.module.$update();

        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox").empty();
      });
    }
  ]);
